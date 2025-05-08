export const getBorderColor = (status: string) => {
  switch (status) {
    case "ONGOING":
      return "border-[#381F8C]"
    case "COMPLETED":
      return "border-green-600"
    case "OPEN":
      return "border-[#0887FF]"
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
      return "bg-blue-200 text-blue-800"
    case "Posted by me":
      return "bg-[#BEDFFE] text-[#0887FF]"
    default:
      return "bg-gray-100 text-gray-800"
  }
}