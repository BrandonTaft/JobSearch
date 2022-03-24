import http from "../http";


class JobsService {
  getAllGoogleJobs() {
    return http.get("/googlejobs");
  }
  getAllLinkedInJobs() {
    return http.get("/linkedin-jobs");
  }
  checkPortfolio() {
    return http.get(`/portfolio`);
  }
  getSavedJobs() {
    return http.get("/savedjobs");
  }
  delete(id) {
    return http.delete(`/${id}`);
  }
  deleteAll() {
    return http.delete(`/`);
  }
  findByTitle(title) {
    return http.get(`/?title=${title}`);
  }
  create(data) {
    return http.post("/", data);
  }
  update(id, data) {
    return http.put(`/${id}`, data);
  }
}
export default new JobsService();