import http from "../http";

//Service that uses the Axios object to send http requests
class JobsService {
  getAllGoogleJobs() {
    return http.get("/googlejobs");
  }
  checkPortfolio() {
    return http.get(`/portfolio`);
  }
  create(data) {
    return http.post("/", data);
  }
  update(id, data) {
    return http.put(`//${id}`, data);
  }
  delete(id) {
    return http.delete(`//${id}`);
  }
  deleteAll() {
    return http.delete(`/`);
  }
  findByTitle(title) {
    return http.get(`/?title=${title}`);
  }
}
export default new JobsService();