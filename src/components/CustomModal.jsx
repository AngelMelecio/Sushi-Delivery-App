import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import {useCasaMaki} from '../context/CasaMakiContext'
const CustomModal = ({ visible, setVisible, title='', message='', cancel=false }) => {
  const {textStyles} = useCasaMaki()
  return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          //alert("Modal has been closed.");
          setVisible(!visible);
        }}
      >
        <View style={[styles.centeredView, styles.blackTransparency]}>
          <View style={styles.modalView}>
            
            { title.length>0 ? 
            <Text style={[textStyles.h2, styles.modalTitle, title=='ERROR' && styles.redText ]}>
              {title}
            </Text> : <></>}
            
            <Text style={[textStyles.body3, styles.modalText]}>{message}</Text>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
              
              { cancel ? 
              <TouchableOpacity style={[styles.button, styles.buttonClose]}
                onPress={() => setVisible(!visible) }
                >
                <Text style={[textStyles.h3, styles.textStyle]}>Cancelar</Text>
              </TouchableOpacity> : <></>}
              
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setVisible(!visible)}
              >
                <Text style={{...textStyles.h3, color:COLORS.white, textAlign:'center', marginTop:6}}>Ok</Text>
              </TouchableOpacity >
            </View>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    //marginTop: 22
  },
  blackTransparency:{
    
    backgroundColor:'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: SIZES.radius,
    padding: SIZES.padding*2,
    //alignItems: "center",
    backgroundColor:COLORS.white
  },
  button: {
    marginTop:10,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding/1.5,
    paddingHorizontal: SIZES.padding*2,
    width:SIZES.width*0.30
  },
  buttonClose: {
    backgroundColor: COLORS.secondary  
  },
  textStyle: {
    textAlign: 'center',
    paddingTop:6,
    color: COLORS.lightGray2,
  },
  modalText: {
    marginVertical: 5,
    //textAlign: "center"
  },  
  modalTitle:{
    //margin: 8,
  },
  redText:{
    color:COLORS.red
  }
});

export default CustomModal;