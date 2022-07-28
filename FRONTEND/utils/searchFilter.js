import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

const SearchFunc = (props) => {
  const [lookSearch, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const data = useSelector((state) => state.retailer.retailer);
  //   console.log("length =>", data.length);

  const [filteredDataSource, setfilteredDataSource] = useState([]);
  const [masterDataSource, setmasterDataSource] = useState(data);
  const searchFilteredfunction = (text) => {
    setmasterDataSource(data);
    try {
      if (text) {
        const newData = masterDataSource.filter(function (item) {
          const itemData = item.firmName
            ? item.firmName.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setfilteredDataSource(newData);
        setSearch(text);
        setIsLoading(false);
      } else if (text == null) {
        setfilteredDataSource(masterDataSource);
        setSearch(text);
        setIsLoading(false);
      } else {
        setfilteredDataSource(data);
        setSearch(text);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error aa gyaa IN FILTERD FUNCTION");
      setfilteredDataSource(data);
    }
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={lookSearch}
        onChangeText={(text) => searchFilteredfunction(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "95%",
    padding: 6,
    backgroundColor: "gainsboro",
    marginTop: 10,
    marginBottom: 4,
  },
});
// module.exports = searchFilteredfunction;
export default SearchFunc;
