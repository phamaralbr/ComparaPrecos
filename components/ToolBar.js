import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {PlusCircle, Trash} from '../assets/SvgComponents';

const Product = (props) => {
    return(
        <View style={styles.container}>

            <View>
                <TouchableOpacity style={styles.touchableOpacity}  onPress={props.addProduct}>
                    <PlusCircle/>
                </TouchableOpacity>
            </View>

            <View/>

            <View>
                <TouchableOpacity style={styles.touchableOpacity} onPress={props.clearList}>
                    <Trash/>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    touchableOpacity: {
        flex: 1, 
        justifyContent: 'center', 
        paddingHorizontal: 15
    }
})

export default Product;