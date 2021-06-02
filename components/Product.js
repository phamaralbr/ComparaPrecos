import React, { useState, useEffect }  from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { TextInput, DefaultTheme } from 'react-native-paper';

const Product = (props) => {

    // CurrencyInput will not work without a  set value, so preco is needed for that input
    const [preco, setPreco] = useState(null);
    

    return(
        <View style={styles.item}>
            
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.inputStyle, {marginLeft: 4}]}
                        selectionColor='#fe2c54'
                        keyboardType='numeric'
                        label="Quantidade"
                        value={props.item.quantidade}
                        onChangeText={(text) => props.setProduct("quantidade", text)}
                        underlineColor='transparent'
                        theme={myTheme}
                    />
                </View>
                <View style={{ width: 1, marginVertical: 8, backgroundColor: '#444'}}></View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.inputStyle, {marginLeft: 25}]}
                        selectionColor='#fe2c54'
                        keyboardType='numeric'
                        label="Preço"
                        maxLength={8}
                        underlineColor='transparent'
                        render={_props =>
                            <CurrencyInput
                                {..._props}
                                value={props.item.preco}
                                onChangeValue={(text) => {props.setProduct("preco", text); setPreco(text)}}
                                prefix=""
                                delimiter=","
                                separator="."
                                precision={2}
                            />
                          }
                        theme={myTheme}
                    />
                </View>
            </View>


            <View style={styles.result}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.inputStyle, {marginLeft: 15}]}
                        label="$ / Qtd."
                        selectionColor='#fe2c54'
                        disabled
                        underlineColor='transparent'
                        render={_props =>
                            <CurrencyInput
                                {..._props}
                                value={props.item.result == null || isNaN(props.item.result) || !isFinite(props.item.result) ? '' : props.item.result.toString()}
                                prefix=""
                                delimiter=","
                                separator="."
                                precision={2}
                            />
                          }
                        theme={props.item.bestValue == null ? myTheme : props.item.bestValue ? bestPriceTheme : badPriceTheme}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: '#333',
        marginBottom: 20,
        borderRadius: 20,
    },

    inputs: {
        flexDirection: 'row',
        backgroundColor: '#1c1c1c',
        width: '70%',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 20,
        elevation: 20, 
    },

    result: {
        width: '30%',
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 10,
    },

    inputContainer: {
        flex: 1,
        height: 58,
        overflow: 'hidden',
    },

    inputStyle: {
        fontSize: 16,
        height: 60,
        overflow: 'hidden',
    }
  });


const myTheme = {
    dark: true,
    roundness: 20,
    colors: {
        primary: '#BFBFBF',         //focus label color
        background: 'transparent',
        error: '#B00020',
        text: '#FFF',               //input color
        disabled: '#BFBFBF',
        placeholder: '#BFBFBF',     //label color
    },
    animation: {
        scale: 1,
    },
    fontFamily: {...DefaultTheme.fonts.regular.fontFamily = "Nunito_400Regular"} 
};

const bestPriceTheme = {
    ...myTheme,
    colors: {
        primary: '#BFBFBF',
        background: 'transparent',
        error: '#B00020',
        text: '#0EDA53',
        disabled: '#BFBFBF',
        placeholder: '#BFBFBF',
    },
};

const badPriceTheme = {
    ...myTheme,
    colors: {
        primary: '#BFBFBF',
        background: 'transparent',
        error: '#B00020',
        text: '#CE5C4D',
        disabled: '#BFBFBF',
        placeholder: '#BFBFBF',
    },
};

export default Product;




// TextInputFlat.tsx       line 147