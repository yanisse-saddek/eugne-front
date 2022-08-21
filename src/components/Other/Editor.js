import { Editor } from '@tinymce/tinymce-react';
import {useContext, useEffect} from 'react'
import { User } from '../../App'

export default function EditorC(props){
    const context = useContext(User)

    return(
        <>
        {/* {context?.user.mail_confirmed? */}
        <Editor
            apiKey='rhfovckwdqtgrkxuqum8cq629m2kvgdvcdbhw0ykhstkac56'
            onEditorChange={(e)=>{context.setTextEditor(e)}}
            value={context.textEditor}
            init={{
            height: 300,
            menubar: false,    
            language: 'fr_FR',
            object_resizing : false,
            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 
                                'codesample', 'emoticons', 'blockquote',
            ],
            toolbar: 'undo redo | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help'+ 'link | codesample | emoticons |    blockquote',
            content_style: 'body { background:#F3F3F3; font-family:Helvetica,Arial,sans-serif; font-size:14px;} img{max-height:70px; max-width:70px}',
            }}
            />
            {/* :<p>Vous devez confirmer votre mail pour pouvoir repondre a ce post</p>} */}
        </>
    )
}