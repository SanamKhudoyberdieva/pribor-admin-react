export const getName = (item:any, lang:string="Uz") => {
  const modStr = lang[0].toUpperCase() + lang.slice(1);
  if(!item) return ""
  return item["name"+ modStr]
}

export const getDescription = (item:any, lang:string="Uz") => {
  const modStr = lang[0].toUpperCase() + lang.slice(1);
  if(!item) return ""
  return item["description"+ modStr]
}

export const getType = (item:any, lang:string="Uz") => {
  const modStr = lang[0].toUpperCase() + lang.slice(1);
  if(!item) return ""
  return item["type"+ modStr]
}