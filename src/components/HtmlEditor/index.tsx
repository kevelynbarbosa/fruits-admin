import React, { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'

import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { NestDataObject, FieldError } from 'react-hook-form'

interface Props {
  onChange: (content: string) => void
  defaultValue?: string
  readonly?: boolean
  required?: boolean
  errors?: NestDataObject<any, FieldError>
  register?: (Ref, validateRule?) => void
  id: string
}

const HtmlEditor: React.FC<Props> = ({
  onChange,
  defaultValue,
  readonly = false,
  required = false,
  register,
  errors,
  id,
}: Props) => {
  const [conteudoDraft, setConteudoDraft] = useState(EditorState.createEmpty())
  const [completedParse, setCompletedParse] = useState(false)
  const [empty, setEmpty] = useState<boolean>(!defaultValue)
  const noop = (e) => e

  useEffect(() => {
    const parseHtmlToDraft = () => {
      const blocksFromHtml = htmlToDraft(defaultValue)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const editorState = EditorState.createWithContent(contentState)
      setConteudoDraft(editorState)
      setCompletedParse(true)

    }


    if (!completedParse && defaultValue)
    {
      parseHtmlToDraft()
    }
  }, [defaultValue, completedParse])

  const handleContentDraft = (editorState) => {
    if (!readonly) {
      setConteudoDraft(editorState)
      const rawContentState = convertToRaw(conteudoDraft.getCurrentContent())
      const content = draftToHtml(rawContentState)
      if(content.trim() === '<p></p>' )
        setEmpty(true)
        else
        setEmpty(false)

      onChange(content)
    }
  }

  useEffect(() => {
      console.log("erros",errors)
      console.log("valur", defaultValue)

  }, [errors])

  return (
    <div className="form-group group-field-button html-form">
      <Editor
        toolbarHidden={readonly}
        editorState={conteudoDraft}
        onEditorStateChange={handleContentDraft}
        toolbarClassName="toolbarClassName"
        wrapperClassName={[
          'wrapperClassName',
          errors && errors[id]?.type === 'required' && (!defaultValue || defaultValue.trim() === '<p></p>')
            ? 'input-error'
            : '',
        ].join(' ')}
        editorStyle={{
          backgroundColor: readonly ? '#f8f9fa' : '#fff',
          minHeight: '240px',
          border: '1px solid #cfd8dc',
          borderRadius: '0.25rem',
        }}
      />
      <input
        name={id}
        tabIndex={-1}
        autoComplete="off"
        style={{
          opacity: 0,
          width: '100%',
          height: 0,
          position: 'absolute',
        }}
        value={!empty ? 'notempty' : ''}
        onChange={noop}
        ref={register}
      />
      { errors && errors[id]?.type === 'required' && (!defaultValue || defaultValue.trim() === '<p></p>') && (
        <span className="error-html-editor">
          preenchimento
          <br /> obrigatório
        </span>
      )}
    </div>
  )
}

export default HtmlEditor
