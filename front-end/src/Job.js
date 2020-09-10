import React from 'react'
import Input from './Input'
export default function Job({
  job,
  editing,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) {
  const { _id, id, title, company, location, tags, hide, summary, } = job
  const [titleValue, titleInput] = Input(title)
  const [companyValue, companyInput] = Input(company)
  const [locationValue, locationInput] = Input(location)
  const [summaryValue, summaryInput] = Input(summary)
  const [tagValue, tagInput] = Input(tags.join(','))
  return (
    <div style={styles.container}>
      {editing ?
        <div>
          <div style={styles.btns}>
            <button style={styles.btn} onClick={() => onSave(_id,
              {
                title: titleValue,
                company: companyValue,
                location: locationValue,
                tags: tagValue.split(','),
                summary: summaryValue,
                hide,
                id
              }
            )}>
              save
            </button>
            <button style={styles.btn} onClick={onCancel}>cancel</button>
            <span style={styles.closeBtn} onClick={() => onDelete(job)}>X</span>
          </div>
          <div>{titleInput} {companyInput} {locationInput} </div>
          <div>{summaryInput}</div>
          <div>tags: {tagInput} </div>
        </div>
        :
        <div>
          <div style={styles.btns}>
            <button style={styles.btn} onClick={() => onEdit(_id)}>edit</button>
            <span style={styles.closeBtn} onClick={() => onDelete(job)}>X</span>
          </div>
          <div style={styles.header}>
            {title} {company} {location}
          </div>
          <div>{summary}</div>
          <span>tags: {tags.join(',')}</span>
        </div>
      }
    </div>
  )
}

var styles = {
  container: {
    flex: 1,
    alighSelf: 'center',
    padding: 20
  },
  header: {
    padding: 10
  },
  btns: {
    display: 'flex',
  },
  closeBtn: {
    marginLeft: 'auto',
    cursor: 'pointer'
  },
  btn: {
    margin: '0 20px 20px 0'
  }
}