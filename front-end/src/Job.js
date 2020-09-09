import React from 'react'
import Input from './Input'
export default function Job({
  job,
  editing,
  onSave,
  onEdit,
  submitTags
}) {
  const { _id, id, title, company, location, tags, hide, summary, } = job
  const [titleValue, titleInput] = Input(title)
  const [tagValue, tagInput] = Input(tags.join(','))
  return (
    <div style={styles.container}>
      {/* {!hide && editing ?
        <div>
          <button onClick={() => onSave(_id,
            { titleValue, company, location, tags, summary, hide, id }
          )}>
            save
            </button>
          <div>{titleInput} {company} {location} </div>
          <div>{summary}</div>
          <div>{tags}</div>
        </div>
        : */}
      <div>
        {/* <button onClick={() => onEdit(id)}>edit</button> */}
        <div style={styles.header}>{title} {company} {location} </div>
        <div>{summary}</div>
        {/* <div>tags: {tagInput} <button onClick={() => submitTags(tagValue)}>submit</button></div> */}
      </div>
      {/* } */}
    </div>
  )
}

var styles = {
  container: {
    width: '80%',
    flex: 1,
    alighSelf: 'center',
    padding: 20
  },
  header: {
    padding: 10
  }
}