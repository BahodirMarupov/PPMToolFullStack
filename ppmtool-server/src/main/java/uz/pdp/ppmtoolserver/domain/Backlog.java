package uz.pdp.ppmtoolserver.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data@AllArgsConstructor@NoArgsConstructor
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
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "backlog",cascade = CascadeType.REMOVE)
    private List<ProjectTask> projectTasks=new ArrayList<>();
}
