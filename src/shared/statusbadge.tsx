export const getBorderColor = (status: string) => {
  switch (status) {
    case "ONGOING":
      return "border-[#381F8C]"
    case "COMPLETED":
      return "border-[#22973C]"
    case "OPEN":
      return "border-[#F59315]"
    case "Posted by me":
      return "border-[#0887FF]"
    default:
      return "border-gray-300"
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "ONGOING":
      return "bg-indigo-100 text-indigo-800"
    case "COMPLETED":
      return "bg-green-100 text-green-800"
    case "OPEN":
      return "bg-orange-100 text-orange-800"
    case "Posted by me":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}