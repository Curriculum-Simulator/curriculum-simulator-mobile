import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AxiosResponse } from 'axios';
import { Button, Checkbox, DataTable, Searchbar } from 'react-native-paper';
import SimulatorDataService from '../services/SimulatorDataService';
import { SimulatorCourseData, SimulatorFormProps } from '../types';

const numberOfItemsPerPageList = [5, 10, 15, 20, 25, 30];

export default function SimulatorForm(props: SimulatorFormProps) {
    /** Student Courses with their states (passed or accessible) **/
    const [program, setProgram] = useState(props.program);

    useEffect(() => {
        setProgram(props.program);
    }, [props.program]);

    /** Form functions */
    function setAllPassed() {
        let courses = [...program];
        courses.map((course) => { course.passed = !course.passed })
        setProgram(courses);
    }

    function handleFormChange(course: SimulatorCourseData) {
        let courses = [...program];
        let foundCourse = courses.find((course, index) => course.id == courses[index].id)
        course.passed = !course.passed
        foundCourse = course
        setProgram(courses);
    }

    function submitForm() {
        SimulatorDataService.submit(program)
            .then((response: AxiosResponse) => {
                setProgram(response.data);
            })
            .catch((error) => {
                console.log("Api call error");
                alert(error.message);
            });
    }

    /** Pagination **/
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, program.length);

    useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    /** Sorting */
    const [direction, setDirection] = useState('descending');

    function changeSortDirection() {
        direction === 'descending' ? setDirection('ascending') : setDirection('descending');
    }

    function sortByQuarter(course1: { quarter: number; }, course2: { quarter: number; }) {
        return direction === 'descending' ? course1.quarter - course2.quarter : course2.quarter - course1.quarter
    }

    /** Searching **/
    const [searchValue, setSearchValue] = useState("");
    const filteredProgram = program.filter(searchById)

    const updateSearchValue = (text: React.SetStateAction<string>) => {
        setSearchValue(text);
    };

    function searchById(course: SimulatorCourseData) {
        if (searchValue === "" || course.id.includes(searchValue.toUpperCase())) return course;
    }

    return (
        <View>
            <Searchbar
                placeholder="Search Here..."
                value={searchValue}
                onChangeText={(text) => updateSearchValue(text)}
                autoCorrect={false}
            />
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title sortDirection={direction} onPress={changeSortDirection}>Acronym</DataTable.Title>
                    <DataTable.Title numeric onPress={() => setAllPassed()}>
                        Passed ?
                    </DataTable.Title>
                    <DataTable.Title numeric>Accessible ?</DataTable.Title>
                </DataTable.Header>

                {
                    filteredProgram.sort(sortByQuarter).slice(from, to).map((course) => {
                        return (
                            <DataTable.Row style={styles.cells} key={course.id}>
                                <DataTable.Cell>{course.id}</DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Checkbox
                                        status={course.passed ? 'checked' : 'unchecked'}
                                        onPress={() => handleFormChange(course)}
                                        color={'green'}
                                    />
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Checkbox
                                        status={course.accessible ? 'checked' : 'unchecked'}
                                        disabled
                                    />
                                </DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                }

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(filteredProgram.length / numberOfItemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} of ${filteredProgram.length}`}
                    showFastPaginationControls
                    numberOfItemsPerPageList={numberOfItemsPerPageList.concat(filteredProgram.length)}
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>
            <Button style={styles.submitButton} color='darkblue' mode="contained" onPress={submitForm}>Submit</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    cells: {

    },
    submitButton: {
        width: 'auto',
        height: 'auto',
        alignSelf: 'flex-end',
    }
});