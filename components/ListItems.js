import React, {useState} from "react";

import {SwipeListView} from "react-native-swipe-list-view";

import {
    ListView,
    TodoText,
    TodoDate,
    SwipedTodoText,
    colors,
    ListViewHidden,
    HiddenButton
} from "../styles/appStyles";
import {Entypo} from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ListItems = ({study, setStudy, handleTriggerEdit}) => {

    
    const [swipedRow, setSwipedRow] = useState(null);

    const handleDeleteStudy = (rowMap, rowKey) => {
        const newStudy = [...study];
        const studyIndex = study.findIndex((study) => study.key === rowKey);
        newStudy.splice(studyIndex, 1);

        AsyncStorage.setItem("storedStudy", JSON.stringify(newStudy)).then(() => {
            setStudy(newStudy);
            console.log(newStudy);
        }).catch(error => console.log(error));
    }
            

    return (
        <> 
        {study.length == 0 && <TodoText>Welcome to SmartStudy! Please press the plus button to plan your next path.</TodoText>}
        {study.length != 0 && 
         <SwipeListView
            data = {study}
            renderItem = {(data) => {
                const RowText = data.item.key === swipedRow ? SwipedTodoText : TodoText;
                return (
                    <ListView
                        backgroundColor = {colors.primary}
                        underlayColor = {colors.primary}
                        onPress = {() => {
                            handleTriggerEdit(data.item)
                        }}
                        >
                        <>
                        <RowText>{data.item.title}, {data.item.topics} topic(s)</RowText>
                        <TodoDate>{data.item.date}, Exam date: {data.item.examdate}</TodoDate>
                        </>
                    </ListView>
                )
                    
            }}
            renderHiddenItem = {(data, rowMap) => {
                return ( 
                <ListViewHidden>
                    <HiddenButton
                        onPress = {() => handleDeleteStudy(rowMap, data.item.key)}
                    >
                        <Entypo 
                            name = "trash"
                            size = {25}
                            color = {colors.secondary}
                        />
                    </HiddenButton>
                </ListViewHidden>
                )
            }}
            leftOpenValue = {80}
            previewRowKey = {"1"}
            previewOpenValue = {300}
            disableLeftSwipe = {true}
            showsVerticalScrollIndicator = {false}
            style = {{
                flex: 1,
                paddingBottom: 30,
                marginBottom: 40
            }}
            onRowOpen = {(rowKey) => {
                setSwipedRow(rowKey);        
            }}
            onRowClose = {() => {
                setSwipedRow(null);
            }}
        />}</>
    );
}

export default ListItems;