import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Card } from "@rneui/base";
import { AxiosResponse } from 'axios';
import CourseDataService from '../services/CourseDataService';
import CourseTable from './CourseTable';
import { CourseData } from '../types';



export default function CourseCard() {
    /** Courses to pass to CourseTable components **/
    const [courses, setCourses] = useState(Array<CourseData>());

    useEffect(() => {
        CourseDataService.getAll()
            .then((response: AxiosResponse) => {
                setCourses(response.data);
            });
    }, []);

    return (
        <Card containerStyle={styles.card} wrapperStyle={{}}>
            <Card.Title>Search a course</Card.Title>
            <Card.Divider />
            <CourseTable courses={courses} />
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: "5%",
        marginBottom: "5%",
        borderRadius: 10,
    },
});
