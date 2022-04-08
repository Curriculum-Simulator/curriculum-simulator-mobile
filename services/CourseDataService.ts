import httpsCommon from "../https-common";
import { CourseData } from "../types";

/* This class is a service that provides methods to get data from the server. */
class CourseDataService {

  /**
   * This function takes a filter and a field as parameters and returns an array of CourseData objects.
   * @param {string} filter - the value of the filter either id or title
   * @param {string} field - The field for the given filter.
   * @returns An array of CourseData objects.
   */
  findByFilterAndField(filter: string, field: string) {
    return httpsCommon.get<Array<CourseData>>(`/courses??filter=${filter}&field=${field}`);
  }


  /**
   * This function takes a section as an argument and returns an array of CourseData objects.
   * @param {string} section either MANAGEMENT, NETWORK or INDUSTRIAL
   * @returns An array of CourseData objects.
   */
  getBySection(section: string) {
    return httpsCommon.get<Array<CourseData>>(`/courses/${section.toUpperCase}`);
  }

  /**
   * GetAll() returns a promise that resolves to an array of CourseData objects
   * @returns An Observable of an array of CourseData objects.
   */
  getAll() {
    return httpsCommon.get<Array<CourseData>>("/courses");
  }
}

export default new CourseDataService();