import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Card } from "@rneui/base";
import { AxiosResponse } from 'axios';
import ProgramDataService from '../services/SimulatorDataService';
import { Section, SimulatorCourseData } from '../types';
import SimulatorForm from './SimulatorForm';
import { Text, View } from './Themed';


export default function SimulatorCard() {
    /** Courses That will be passed to the CourseTable component **/
    const [program, setProgram] = useState(Array<SimulatorCourseData>());
    const [selectedSection, setSelectedSection] = useState(Section.MANAGEMENT);

    /* Course useEffect */
    useEffect(() => {
        ProgramDataService.getBySection(selectedSection)
            .then((response: AxiosResponse) => {
                setProgram(response.data);
            })
            .catch((error) => {
                console.log("Api call error");
                alert(error.message);
            });
    }, [selectedSection]);


    return (
        <View>
            <Card containerStyle={styles.card} wrapperStyle={{}}>
                <Card.Title style={styles.cardTitle}>Curriculum Simulation</Card.Title>
                <Card.Divider />
                <View style={styles.container}>
                    <Text style={styles.sectionText}> Choose your section:</Text>
                    <Picker
                        selectedValue={selectedSection}
                        style={styles.selectionBox}
                        onValueChange={(itemValue) => setSelectedSection(itemValue)}>
                        <Picker.Item label="management" value={Section.MANAGEMENT} />
                        <Picker.Item label="network" value={Section.NETWORK} />
                        <Picker.Item label="industrial" value={Section.INDUSTRIAL} />
                    </Picker>
                </View>
                <SimulatorForm program={program} />
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: "5%",
        marginBottom: "5%",
        borderRadius: 10,
    },
    cardTitle:{
      fontSize: 25,
    },
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-evenly',
        width: 'auto',
    },
    selectionBox: {
        width: 160,
    },
    sectionText: {
        fontSize: 15,
        width: 'auto',
        fontWeight: "bold",
    }
});
