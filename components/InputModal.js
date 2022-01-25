import React, {useState} from "react";
import { Modal, Text, Button, Keyboard, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
var generateToken = require('random-token');

import {
    ModalButton,
    ModalContainer,
    ModalView,
    StyledInput,
    ModalAction,
    ModalActionGroup,
    ModalIcon,
    HeaderTitle,
    colors
} from "./../styles/appStyles";
import {AntDesign} from "@expo/vector-icons";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

const InputModal = ({
    modalVisible, 
    setModalVisible, 
    studyInputValue, 
    setStudyInputValue, 
    revInputValue,
    setRevInputValue,
    topicInputValue,
    setTopicInputValue,
    handleAddStudy,
    handleEditStudy,
    dateInputValue,
    setDateInputValue,
    study,
    studyEdit,
    setStudyEdit
}) => {
    const currentDate = new Date()
    currentDate.setHours(0,0,0,0);
    const difference = Math.abs(dateInputValue - currentDate);
    const dayDifference = Math.ceil(difference/(1000*60*60*24))
    const topicNumber = Math.ceil(topicInputValue/dayDifference);

    const handleCloseModal = () => {
        setModalVisible(false);
        setStudyInputValue("");
        setStudyEdit(null);
    }

    Date.prototype.addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
    
    
    const topicSort = () => {
        dateInputValue.setHours(0,0,0,0);
        var number = 0;
        var token = generateToken(32);
        if(!studyEdit){
           handleAddStudy({
                title: studyInputValue,
                examdate: dateInputValue.toDateString(),
                topics: topicNumber,
                key: token,
                diff: dayDifference,
            }, dayDifference)
        }
        
    }
    
    
    
    const [isPickerShow, setIsPickerShow] = useState(false);

    const showPicker = () => {
        setIsPickerShow(true);
      };
    
      const onChange = (event, value) => {
        setDateInputValue(value);
        if (Platform.OS === 'android') {
          setIsPickerShow(false);
        }
      };
    
      
    return (
        <>
            <ModalButton onPress = {() => {setModalVisible(true)}}>
                <AntDesign
                    name = "plus"
                    size = {30}
                    color = {colors.secondary}
                />
            </ModalButton>

            <Modal
                animationType = "slide"
                transparent = {true}
                visible = {modalVisible}
                onRequestClose = {setModalVisible}
            >
                <ModalContainer>
                    <DismissKeyboard>
                    <ModalView>
                    <ModalIcon>
                        <HeaderTitle>Add a subject</HeaderTitle>
                        <AntDesign 
                        name = "edit"
                        size = {30}
                        color = {colors.tertiary}
                        />   
                    </ModalIcon>


                    <StyledInput
                        placeholder = "Enter exam subject"
                        placeholderTextColor = {colors.alternative}
                        selectionColor = {colors.secondary}
                        autoFocus = {true}
                        onChangeText = {(text) => setStudyInputValue(text)}
                        value = {studyInputValue}
                        onSubmitEditing = {topicSort}
                    />

                    

                    <Text></Text>
                    
                    {!isPickerShow && (
                    <View>
                        <Button title="Set exam date" color="purple" onPress={showPicker} />
                    </View>
                    )}

                    {isPickerShow && (
                        <DateTimePicker
                        value={currentDate}
                        mode={'date'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={true}
                        onChange={onChange}
                        />
                    )}

                    {/* <Text></Text>

                    
                    
                    <StyledInput
                        placeholder = "Number of revision days"
                        placeholderTextColor = {colors.alternative}
                        selectionColor = {colors.secondary}
                        autoFocus = {true}
                        onChangeText = {(number) => setRevInputValue(number)}
                        value = {revInputValue}
                        onSubmitEditing = {handleSubmit}
                        keyboardType = "number-pad"
                    /> */}

                    

                    <Text></Text>

                    

                    <StyledInput
                        placeholder = "Number of topics"
                        placeholderTextColor = {colors.alternative}
                        selectionColor = {colors.secondary}
                        autoFocus = {true}
                        onChangeText = {(number) => setTopicInputValue(number)}
                        value = {topicInputValue}
                        onSubmitEditing = {topicSort}
                        keyboardType = "number-pad"
                    />

                    <ModalActionGroup>
                        <ModalAction color = {colors.primary} onPress = {handleCloseModal}>
                        <AntDesign 
                        name = "close"
                        size = {28}
                        color = {colors.tertiary}
                        />
                        </ModalAction>
                        <ModalAction color = {colors.tertiary} onPress = {topicSort}>
                        <AntDesign 
                        name = "check"
                        size = {28}
                        color = {colors.secondary}
                        />
                        </ModalAction>
                    </ModalActionGroup>
                    </ModalView>
                    </DismissKeyboard>
                </ModalContainer>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
      margin: 8,
      color: "white",
    },
  });


export default InputModal;