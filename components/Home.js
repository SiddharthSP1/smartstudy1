import React, {useState} from "react";

import Header from "./Header";
import ListItems from "./ListItems";
import InputModal from "./InputModal";

import AsyncStorage from "@react-native-async-storage/async-storage";
import SliderNativeComponent from "react-native/Libraries/Components/Slider/SliderNativeComponent";

var generateToken = require('random-token');


const Home = ({study, setStudy}) => {
    const handleClearStudy = () => {
        AsyncStorage.clear() .then(() => {
            setStudy([]);
        }).catch(error => console.log(error));
    }

    const [modalVisible, setModalVisible] = useState(false)
    const [studyInputValue, setStudyInputValue] = useState();
    const [dateInputValue, setDateInputValue] = useState(new Date());
    const [revInputValue, setRevInputValue] = useState();
    const [topicInputValue, setTopicInputValue] = useState();
    const currentDate = new Date()
    currentDate.setHours(0,0,0,0);


    const handleAddStudy = (Study, days) => {
  
        let newStudy = [];
        let oldStudy = [];

        Date.prototype.addDays = function (day) {
            const date = new Date(this.valueOf());
            date.setDate(date.getDate() + day);
            return date;
        };

        for (var i = 0; i < days; i++){
            let tempStudy = {};
                tempStudy.title = Study.title;
            tempStudy.examdate = Study.examdate;
            tempStudy.topics = Study.topics;
            tempStudy.diff = Study.diff;
            tempStudy.key = generateToken(32);
            tempStudy.date = currentDate.addDays(i).toDateString()
            newStudy = [...newStudy, tempStudy];
        }
        oldStudy = [...study, ...newStudy];
        AsyncStorage.setItem("storedStudy", JSON.stringify(oldStudy)).then(() => {
            setModalVisible(false);
        }).catch(error => console.log(error));
        setStudy(oldStudy);
        setStudyInputValue("");
        setDateInputValue("");
        setRevInputValue("");
        setTopicInputValue("");
    }


    const [studyEdit, setStudyEdit] = useState(null);
    
    const handleTriggerEdit = (item) => {
        setStudyEdit(item);
        setModalVisible(true);
        setStudyInputValue(item.title);
        setDateInputValue(item.examdate);
    }

    const handleEditStudy = (editedStudy) => {
        const newStudy = [...study];
        const studyIndex = study.findIndex((study) => study.key === editedStudy.key);
        newStudy.splice(studyIndex, 1, editedStudy);

        AsyncStorage.setItem("storedStudy", JSON.stringify(newStudy)).then(() => {
            setStudy(newStudy);
            setModalVisible(false);
            setStudyEdit(null);
        }).catch(error => console.log(error));
    }

    return (
        <>
        <Header handleClearStudy = {handleClearStudy} />
        <ListItems
            study = {study}
            setStudy = {setStudy}
            handleTriggerEdit = {handleTriggerEdit}
        />
        <InputModal
            modalVisible = {modalVisible}
            setModalVisible = {setModalVisible}
            studyInputValue = {studyInputValue}
            setStudyInputValue = {setStudyInputValue}
            dateInputValue = {dateInputValue}
            setDateInputValue = {setDateInputValue}
            revInputValue = {revInputValue}
            setRevInputValue = {setRevInputValue}
            topicInputValue = {topicInputValue}
            setTopicInputValue = {setTopicInputValue}
            handleAddStudy = {handleAddStudy}
            study = {study}
            setStudyEdit = {setStudyEdit}
            studyEdit = {studyEdit}
            handleEditStudy = {handleEditStudy}
        />
        </>
    );
}

export default Home;