import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Card } from "@rneui/base";
import { AxiosResponse } from 'axios';
import CourseDataService from '../services/CourseDataService';
import { CourseData, Section } from '../types';
import CourseTable from './CourseTable';
import { Text, View } from './Themed';


export default function CourseCard() {
    /** Courses That will be passed to the CourseTable component **/
    const [courses, setCourses] = useState(Array<CourseData>());
    const [selectedSection, setSelectedSection] = useState(Section.MANAGEMENT);

    /* Course useEffect */
    useEffect(() => {
        if (selectedSection === Section.ALL) {
            CourseDataService.getAll()
                .then((response: AxiosResponse) => {
                    setCourses(response.data);
                })
                .catch((error) => {
                    console.log("Api call error");
                    alert(error.message);
                });
        } else {
            CourseDataService.getBySection(selectedSection)
                .then((response: AxiosResponse) => {
                    setCourses(response.data);
                })
                .catch((error) => {
                    console.log("Api call error");
                    alert(error.message);
                });
        }
    }, [selectedSection]);

    return (
        <View>
            <Card containerStyle={styles.card} wrapperStyle={{}}>
                <Card.Title style={styles.cardTitle}>Search a course</Card.Title>
                <Card.Divider />
                <View style={styles.container}>
                    <Text style={styles.sectionText}> Choose your section:</Text>
                    <Picker
                        selectedValue={selectedSection}
                        style={styles.selectionBox}
                        onValueChange={(itemValue) => setSelectedSection(itemValue)}>
                        <Picker.Item label="all" value={Section.ALL} />
                        <Picker.Item label="management" value={Section.MANAGEMENT} />
                        <Picker.Item label="network" value={Section.NETWORK} />
                        <Picker.Item label="industrial" value={Section.INDUSTRIAL} />
                    </Picker>
                </View>
                <Card.Divider />
                <CourseTable courses={courses} />
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
    cardTitle: {
        fontSize: 25
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
