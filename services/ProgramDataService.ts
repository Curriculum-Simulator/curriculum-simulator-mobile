import httpsCommon from "../https-common";
import { ProgramCourseData, Section } from "../types";

/* This class is a service that provides methods to get data from the server. */
class ProgramDataService {

  /**
   * getBySection returns an array of CourseData objects from the API
   * @param {string} section - string
   * @returns An array of CourseData objects.
   */
  getBySection(section: Section) {
    return httpsCommon.get<Array<ProgramCourseData>>(`/program?section=${section}`);
  }

  /**
   * This function takes an array of ProgramCourseData objects and returns an array of
   * ProgramCourseData objects.
   * @param program - Array<ProgramCourseData>
   * @returns An Observable of type Array<CourseData>
   */
  submit(program: Array<ProgramCourseData>){
    return httpsCommon.post<Array<ProgramCourseData>>(`/program`, program);
  }
}

export default new ProgramDataService();