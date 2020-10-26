package uz.pdp.ppmtoolserver.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Backlog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer PTSequence=0;

    private String projectIdentifier;

    //OneToOne with project
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id",nullable = false)
    @JsonIgnore
    private Project project;

    //OneToMany projects
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "backlog",cascade = CascadeType.REFRESH,orphanRemoval = true)
    private List<ProjectTask> projectTasks=new ArrayList<>();

    public Backlog(Long id, Integer PTSequence, String projectIdentifier, Project project, List<ProjectTask> projectTasks) {
        this.id = id;
        this.PTSequence = PTSequence;
        this.projectIdentifier = projectIdentifier;
        this.project = project;
        this.projectTasks = projectTasks;
    }

    public Backlog() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPTSequence() {
        return PTSequence;
    }

    public void setPTSequence(Integer PTSequence) {
        this.PTSequence = PTSequence;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }

    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<ProjectTask> getProjectTasks() {
        return projectTasks;
    }

    public void setProjectTasks(List<ProjectTask> projectTasks) {
        this.projectTasks = projectTasks;
    }
}
