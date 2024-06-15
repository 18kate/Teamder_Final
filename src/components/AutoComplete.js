import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const AutoComplete = ({ data, value, onChangeText, renderItem, ...rest }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    onChangeText(text);
    if (text.length >= 1) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  useEffect(() => {
    if (filteredData.length > 0) {
      onChangeText(filteredData[0].name);
    }
  }, [filteredData]);

  const handleSelectItem = (item) => {
    setSearchText(item.name);
    onChangeText(item.name);
    setFilteredData([]);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={handleSearch}
        {...rest}
      />
      {filteredData.length > 0 && (
        <View>
          {filteredData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => handleSelectItem(item)}
            >
              {renderItem({ item })}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default AutoComplete;
