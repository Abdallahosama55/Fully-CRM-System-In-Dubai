import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/note/";

/**
 *
 * @typedef {Object} NotePayload
 * @property {string} text - the text of the note
 * @property {string} noteDate - The date of the note
 * @property {number} [customerId] - The id of the customer (if you want to add a note to a customer)
 * @property {number} [leadId] - The id of the lead (if you want to add a note to a lead)
 */

/**
 * Creates a new note
 * @param {NotePayload} data
 * @returns {Promise<AxiosResponse<{
 *      id: number,
 *      text: string,
 *      noteDate: string,
 *      customerId: number | null,
 *      dealId: number | null
 * }>>}
 */

const addNote = (data) => axios.post(SERVICE_BASE + "add", data);
const getNotes = (params = {}) =>
  axios.get(SERVICE_BASE + "get-all", {
    params: { page: 1, limit: 10, ...params },
  });
const deleteNote = (id) => axios.delete(SERVICE_BASE + "delete/" + id);
const NotesService = {
  deleteNote,
  addNote,
  getNotes,
};

export default NotesService;
