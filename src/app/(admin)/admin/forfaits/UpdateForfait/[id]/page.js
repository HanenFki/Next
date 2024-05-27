import { fetchForfaitById } from "@/services/ForfaitService";
import UpdateForfait from '@/components/admin/UpdateForfaitComponent';

const getForfait = async (id) => {
  const data = await fetchForfaitById(id);
  console.log("Fetched Forfait Data: ", data); // Log the fetched data
  return data;
}

const ForfaitUpdatePage = async ({ params }) => {
  const forfait = await getForfait(params.id);
  console.log("Forfait Data to be Passed to Component: ", forfait); // Log the data to be passed
  return (
    <div>
      <UpdateForfait forfait={forfait} />
    </div>
  );
}

export default ForfaitUpdatePage;
