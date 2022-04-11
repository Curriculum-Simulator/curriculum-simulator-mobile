import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Checkbox, DataTable, Searchbar } from 'react-native-paper';
import { View } from './Themed';
import { SimulatorCourseData, SimulatorFormProps } from '../types';

const numberOfItemsPerPageList = [5, 10, 15, 20, 40];

export default function SimulatorForm(props: SimulatorFormProps) {
    /** Student Courses with their states (passed or accessible) **/
    const [program, setProgram] = useState(props.program);

    useEffect(() => {
        setProgram(props.program);
    }, [props.program]);

    /** Form functions */
    function handleFormChange(course: SimulatorCourseData){
        let courses = [...program];
        let foundCourse = courses.find((course, index) => course.id == courses[index].id)
        course.passed = !course.passed
        foundCourse = course
        setProgram(courses);
    }

    function setAllPassed() {
        let courses = [...program];
        courses.map((course) => {course.passed = !course.passed })
        setProgram(courses);
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
});




{
    /** Form inputs **/
    /*const [inputFields, setInputFields] = useState([
        { id: "", isPassed: false, isAccessible: false }
    ])*/

    /*const handleFormChange = (index: number, event) => {
        let data = [...program];
        data[index][event.target.name] = event.target.value;
        setProgram(data);
    }*/


    /*
    program.map(course => {
        inputFields.push([course.id, course.passed, course.accessible])
    })

    inputFields.map((input, index) => {
        return (
            <DataTable.Row style={styles.cells} key={input.id}>
                <DataTable.Cell>{input.id}</DataTable.Cell>
                <DataTable.Cell>
                    <Checkbox
                        status={input.isPassed ? 'checked' : 'unchecked'}
                        onPress={event => handleFormChange(index, event)}
                    />
                </DataTable.Cell>
                <DataTable.Cell>
                    <Checkbox
                        status={input.isAccessible ? 'checked' : 'unchecked'}
                        disabled
                        onPress={event => handleFormChange(index, event)}
                    />
                </DataTable.Cell>
            </DataTable.Row>
        )
    })
    */
}