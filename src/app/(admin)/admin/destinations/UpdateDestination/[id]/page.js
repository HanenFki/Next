
import {fetchDestinationById} from "@/services/DestinationService"
import UpdateDestination from '@/components/admin/UpdateDestinationComponent';

const getDestination=async(id)=>{
const data=await fetchDestinationById(id)
return data;
}
const DestinationUpdatePage = async({params}) => {

const destination = await getDestination(params.id)
return (
<div>
<UpdateDestination destination={destination} />
</div>
)
}
export default DestinationUpdatePage 
