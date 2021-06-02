import React, { useState } from "react";
import { StyleSheet, View, Animated, ScrollView, ToastAndroid } from "react-native";
import Product from "./Product";
import ToolBar from "./ToolBar";

const ProductList = (props) => {
  const [products, setProducts] = useState([
    { quantidade: null, preco: null, result: null, bestValue: null },
    { quantidade: null, preco: null, result: null, bestValue: null },
  ]);

  setProduct = (property, data, i) => {
    let tempArr = [...products];

    //set product property to data
    tempArr[i][property] = data;

    //calculate and set result
    if (tempArr[i].quantidade != null && tempArr[i].preco != null) {
      tempArr[i].result = tempArr[i].preco / tempArr[i].quantidade;
    } else {
      tempArr[i].result = null;
    }

    //set result colors
    let bestPrice = Math.min.apply(
      null,
      tempArr.map(function (a) {
        return a.result == null ? Infinity : a.result;
      })
    );
    tempArr.map((item, index) => {
      if (item.result == null) {
        tempArr[index].bestValue = null;
      } else if (item.result <= bestPrice) {
        tempArr[index].bestValue = true;
      } else tempArr[index].bestValue = false;
    });

    setProducts(tempArr);
  };

  addProduct = () => {
    if(products.length <= 6){
      let tempArr = [...products];
      tempArr.push({ quantidade: null, preco: null, result: null, bestValue: null });
      setProducts(tempArr);
    }else{
      ToastAndroid.showWithGravity(
        "Número máximo de itens criados",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  }

  clearList = () => {
    // let tempArr = [...products];
    // tempArr.length = 0;
    setProducts([
      { quantidade: null, preco: null, result: null, bestValue: null },
      { quantidade: null, preco: null, result: null, bestValue: null },
    ]);
  }

  return (
    <View style={styles.container}>
      <ScrollView scrollEventThrottle={16} contentContainerStyle={{ paddingTop: props.Header_Maximum_Height, borderRadius: 20 }} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: props.AnimatedHeaderValue } } }], { useNativeDriver: false })}>
        <View style={styles.products}>
          {products.map((item, i) => {
            return <Product key={i} item={item} setProduct={(property, data) => setProduct(property, data, i)} />;
          })}
        </View>
      </ScrollView>
      <ToolBar addProduct={addProduct} clearList={clearList}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  products: {
    color: "#FFF",
    paddingHorizontal: 10,
  },
});

export default ProductList;
