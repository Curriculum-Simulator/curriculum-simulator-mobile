import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Card } from "@rneui/base";
import { AxiosResponse } from 'axios';
import CourseDataService from '../services/CourseDataService';
import CourseTable from './CourseTable';
import { CourseData } from '../types';
import { View } from './Themed';


export default function CourseCard() {
    /** Courses That will be passed to the CourseTable component **/
    const [courses, setCourses] = useState(Array<CourseData>());

    useEffect(() => {
        CourseDataService.getAll()
            .then((response: AxiosResponse) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.log("Api call error");
                alert(error.message);
            });
    }, []);

    return (
        <View>
            <Card containerStyle={styles.card} wrapperStyle={{}}>
                <Card.Title>Search a course</Card.Title>
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
});
