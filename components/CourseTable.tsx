import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { DataTable } from 'react-native-paper';
import { Text, View } from './Themed';
import { CourseTableProps } from '../types';


const numberOfItemsPerPageList = [5, 10, 15];

export default function CourseTable(props: CourseTableProps) {
    /** Courses **/
    const [courses, setCourses] = useState(props.courses);

    useEffect(() => {
        setCourses(props.courses);
    }, [props.courses]);

    /** Pagination **/
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, courses.length);

    useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    /** Sorting */
    const [direction, setDirection] = useState('descending');

    useEffect(() => {
        setDirection(direction);
    }, [direction]);

    function changeSortDirection() {
        direction === 'descending' ? setDirection('ascending') : setDirection('descending');
    }

    function sortByQuarter(course1: { quarter: number; }, course2: { quarter: number; }) {
        if (direction === 'descending') {
            return course1.quarter - course2.quarter;
        } else {
            return course2.quarter - course1.quarter;
        }
    }

    return (
        <View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title sortDirection={direction} onPress={changeSortDirection}>Acronym</DataTable.Title>
                    <DataTable.Title>Title</DataTable.Title>
                    <DataTable.Title numeric>Ects</DataTable.Title>
                </DataTable.Header>

                {
                    courses.sort(sortByQuarter).slice(from, to).map(course => {
                        return (
                            <DataTable.Row style={styles.cells} key={course.id} >
                                <DataTable.Cell>{course.id}</DataTable.Cell>
                                <DataTable.Cell style={styles.titleCell}>{course.title}</DataTable.Cell>
                                <DataTable.Cell numeric>{course.credits}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                }

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(courses.length / numberOfItemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} of ${courses.length}`}
                    showFastPaginationControls
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    selectPageDropdownLabel={'Rows per page'}
                />

            </DataTable>
        </View>
    );
}

const styles = StyleSheet.create({
    cells: {

    },
    titleCell: {

    }
});