package uz.pdp.ppmtoolserver.exception;

public class BacklogExceptionResponse {
    private String ProjectNotFound;

    public BacklogExceptionResponse() {
    }

    public BacklogExceptionResponse(String projectNotFound) {
        ProjectNotFound = projectNotFound;
    }

    public String getProjectNotFound() {
        return ProjectNotFound;
    }

    public void setProjectNotFound(String projectNotFound) {
        ProjectNotFound = projectNotFound;
    }
}
