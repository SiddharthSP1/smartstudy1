import React from "react";

import {
    HeaderView,
    HeaderTitle,
    HeaderButton,
    colors
} from "./../styles/appStyles";
import {Entypo} from "@expo/vector-icons";

const Header = ({handleClearStudy}) => {
    return (
        <HeaderView>
            <HeaderTitle>Pending work:</HeaderTitle>
            <HeaderButton
                onPress = {handleClearStudy}    
            >
                <Entypo 
                    name = "trash"
                    size = {25}
                    color = {colors.tertiary}
                />
            </HeaderButton>
        </HeaderView>
    );
}

export default Header;