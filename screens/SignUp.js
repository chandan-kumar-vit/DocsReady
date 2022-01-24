import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Avatar, TextInput, Colors, ActivityIndicator, Button } from 'react-native-paper';
import React from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Ionicons';

const SignUp = ({ navigation }) => {

  const calendar = new Date();
  const [myName, setName] = React.useState('');
  const [myEmail, setEmail] = React.useState('');
  const [myAadhar, setAadhar] = React.useState('');
  const [myFName, setFName] = React.useState('');
  const [myDOB, setDOB] = React.useState(calendar);
  const [myLine1, setLine1] = React.useState('');
  const [myLine2, setLine2] = React.useState('');
  const [myCity, setCity] = React.useState('');
  const [myDistrict, setDistrict] = React.useState('');
  const [myState, setState] = React.useState('');
  const [myPIN, setPIN] = React.useState('');
  const [myPass, setPass] = React.useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDOB(date);
    hideDatePicker();
  };


  const host = 'https://docsready-server.herokuapp.com';

  const handleSignUp = async () => {
    let url = `${host}/api/auth/signup`;

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: myName, email: myEmail, password: myPass, aadharNumber: myAadhar, fatherName: myFName, address: `${myLine1} ${myLine2}, ${myCity} Distt:${myDistrict} State:${myState}, ${myPIN}`, dob: myDOB })
    });
    const userDetails = await response.json();

    if (userDetails.success) {
      alert("User added Successfully!")
      navigation.navigate('DocsReady')
    }

    else {
      alert("Enter valid inputs!");
    }
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.avatar}>
        <Avatar.Image size={110} source={require('./docsreadyIcon.jpg')} />
      </View>
      <Text style={{color:'red'}}>* All fields are mandory</Text>
      <TextInput
        mode="outlined"
        label="Name"
        placeholder="eg: Rahul Dravid"
        value={myName}
        onChangeText={myName => setName(myName)}
      />

      <TextInput
        mode="outlined"
        label="email"
        placeholder="eg: indiancoach@gmail.com"
        value={myEmail}
        onChangeText={myEmail => setEmail(myEmail)}
      />

      <TextInput
        mode="outlined"
        label="Aadhar number"
        placeholder="eg: 123456789876"
        value={myAadhar}
        onChangeText={myAadhar => setAadhar(myAadhar)}
      />

      <TextInput
        mode="outlined"
        label="Father's Name"
        placeholder="eg: Rahul Dravid Sr."
        value={myFName}
        onChangeText={myFName => setFName(myFName)}
      />


      <View style={{ paddingTop: 10, flexDirection: 'row' }}>
        <TextInput
          style={{ width: "50%" }}
          mode="outlined"
          label="DOB"
          placeholder="YYYY-MM-DD"
          value={myDOB}
          onChangeText={myDOB => setDOB(myDOB)}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Icon size={44} color="black" name="calendar" onPress={showDatePicker} />
      </View>


      <View style={{ paddingTop: 20 }}>
        <Text>Address</Text>
        <View>
          <TextInput
            mode="outlined"
            label="Line 1"
            placeholder="eg: 12/4 ETX BT Area"
            value={myLine1}
            onChangeText={myLine1 => setLine1(myLine1)}
          />
          <TextInput
            mode="outlined"
            label="Line 2"
            placeholder="eg: Rajeev Chowk Barmasia"
            value={myLine2}
            onChangeText={myLine2 => setLine2(myLine2)}
          />
        </View>


        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={{ width: "50%" }}
            mode="outlined"
            label="City"
            placeholder="eg: Katihar"
            value={myCity}
            onChangeText={myCity => setCity(myCity)}
          />
          <TextInput
            style={{ width: "50%" }}
            mode="outlined"
            label="District"
            placeholder="eg: Katihar"
            value={myDistrict}
            onChangeText={myDistrict => setDistrict(myDistrict)}
          />
        </View>


        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={{ width: "50%" }}
            mode="outlined"
            label="State"
            placeholder="eg: Bihar"
            value={myState}
            onChangeText={myState => setState(myState)}
          />
          <TextInput
            style={{ width: "50%" }}
            mode="outlined"
            label="PIN Code"
            placeholder="eg: 123456"
            value={myPIN}
            onChangeText={myPIN => setPIN(myPIN)}
          />
        </View>

      </View>

      <View>
        <TextInput
          mode="outlined"
          label="Password"
          placeholder='Minimum 6 characters'
          secureTextEntry
          value={myPass}
          onChangeText={myPass => setPass(myPass)}
          right={<TextInput.Icon name="eye" />}
        />
      </View>

      <View style={{ paddingTop: 10, paddingBottom: 50 }}>
        <Button mode="contained" onPress={handleSignUp} color={Colors.blue800}>
          Join DocsReady
        </Button>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  adressContainer: {
    padding: 10
  },
  container: {
    padding: 10
  },
  heading: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    fontStyle: 'italic'
  },
  avatar: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center'
  },
})

export default SignUp;
