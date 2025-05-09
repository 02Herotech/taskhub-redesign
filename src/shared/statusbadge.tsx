export const getBorderColor = (status: string) => {
  switch (status) {
    case "ONGOING":
      return "border-l-[#381F8C]"
    case "COMPLETED":
      return "border-l-green-600"
    case "OPEN":
    case "Posted by me":
      return "border-l-[#0887FF]"
    case "ASSIGNED":
      return "border-l-[#F59315]"
    default:
      return "border-l-gray-300"
  }
}

export const getStatusColor = (status: string) => {
  console.log(status, "status color")

  switch (status) {
    case "ONGOING":
      return "bg-indigo-100 text-indigo-800"
    case "COMPLETED":
      return "bg-green-100 text-green-800"
    case "OPEN":
      return "bg-blue-200 text-blue-800"
    case "Posted by me":
      return "bg-[#BEDFFE] text-[#0887FF]"
    case "ASSIGNED":
      return "bg-[#FBF1E2] text-[#F59315]"
    default:
      return "bg-gray-100 text-gray-800"
  }
}