import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {MultiSelect} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

const MultiSelectDropDown = ({
  isShowTags,
  setIsShowTags,
  tagList,
  selected,
  handleSelectSubTag,
  children,
}) => {
  return (
    <ReactNativeModal
      isVisible={isShowTags}
      animationInTiming={100}
      animationOutTiming={100}
      useNativeDriver={true}
      onBackButtonPress={() => setIsShowTags(false)}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeModalIcon}
          onPress={() => {
            setIsShowTags(false);
          }}>
          <Icon name="close" size={40} color="#000" />
        </TouchableOpacity>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextModalStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          // search
          data={tagList} // projType === 'New' ? subTagsList : imageSubTag
          labelField="label"
          valueField="value"
          placeholder="Select item"
          // searchPlaceholder="Search..."
          value={selected}
          onChange={item => {
            console.log('item', item);
            handleSelectSubTag(item);
          }}
          selectedStyle={styles.selectedStyle}
        />
        {children}
      </View>
    </ReactNativeModal>
  );
};

export default MultiSelectDropDown;
