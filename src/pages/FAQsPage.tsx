
import { MainLayout } from "@/components/Layout/MainLayout";
import { FAQManager } from "@/components/FAQ/FAQManager";
import { useParams } from "react-router-dom";

const FAQsPage = () => {
  const { taskId } = useParams<{ taskId?: string }>();

  return (
    <MainLayout>
      <div className="container py-8">
        <FAQManager taskId={taskId} />
      </div>
    </MainLayout>
  );
};

export default FAQsPage;
