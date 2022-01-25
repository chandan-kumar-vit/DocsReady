import { View, Text, Image } from 'react-native';
import React from 'react';

const DocViewer = ({ route, navigation }) => {

  const { url } = route.params;
  return (
    <View style={{
      padding: 10, flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Image
        source={{
          uri: url,
        }}
        style={{ width: "100%", height: 300 }}
      />
    </View>
  );
};

export default DocViewer;
