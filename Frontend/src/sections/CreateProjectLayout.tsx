import ProjectDetailsForm from "../sections/ProjectDetailsForm";
import ProjectPreviewPanel from "../sections/ProjectCardPreview";
import ProjectCard from "../sections/ProjectCard";

export default function CreateProjectLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT */}
      <div className="lg:col-span-7">
        <ProjectDetailsForm />
      </div>

      {/* RIGHT */}
      <div className="lg:col-span-5">
        {/* <ProjectPreviewPanel /> */}
        <ProjectCard
          title={"Abraham is a donkey"}
          description={
            "Maybe yes Maybe no Maybe yes Maybe no Maybe yes Maybe no Maybe yes Maybe no Maybe yes Maybe no Maybe yes Maybe no "
          }
          tags={["react", "node"]}
          members={0}
          maxMembers={10}
          status={"open"}
        />
      </div>
    </div>
  );
}
