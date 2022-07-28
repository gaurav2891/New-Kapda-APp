import React, { useState } from "react";
import {
  Platform,
  TextInput,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

const SearchablePicker = ({
  getValue,
  placeholder,
  emptyMessage,
  defaultValue = "",
  data,
  inputStyles,
  containerStyles,
  emptyMessageStyles,
  listStyles,
  itemStyles,
}) => {
  let i = 0;
  let filtered = [];
  const [inputValue, setInputValue] = useState(defaultValue);
  const [listVisibility, setListVisibility] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const onChange = (val) => {
    setInputValue(val);
    setListVisibility(true);
    getValue(val);

    if (val.trim()) {
      filtered = data.filter(function (item) {
        const itemData = item ? item.toUpperCase() : `""`;
        const textData = val.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredData(filtered);
    } else if (val.trim() == null) {
      setFilteredData(data);
      setInputValue(val);
    } else {
      setFilteredData(data);
      setInputValue(val);
    }
  };

  return (
    <View style={{ ...containerStyles }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        <TextInput
          value={inputValue}
          onChangeText={onChange}
          placeholder={placeholder}
          style={{ flex: 1, ...inputStyles }}
        />
      </View>

      {inputValue.length > 0 && listVisibility && filteredData.length > 0 ? (
        <View>
          {Array.isArray(filteredData) && data.length ? (
            <FlatList
              nestedScrollEnabled={true}
              style={styles.flatList}
              data={filteredData}
              keyExtractor={(item) => i++}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange(item);
                    setListVisibility(false);
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 5,
                      ...itemStyles,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text
              style={{
                textAlign: "center",
                marginVertical: 5,
                ...emptyMessageStyles,
              }}
            >
              {emptyMessage}
            </Text>
          )}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    shadowColor: "green",
    shadowOpacity: 1.55,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    borderBottomLeftRadius: 12,
    backgroundColor: "#ffffff",
    elevation: 7,
    maxHeight: 320,
    borderBottomColor: "#ccc",
    borderBottomWidth: 4,
    width: "90%",
  },
});

export default SearchablePicker;
