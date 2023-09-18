import React, {useState, useEffect} from 'react'
import EditLessonHeader from './editLessonComp/Header'
import EditLessonSideBar, { dummyText } from './editLessonComp/SideBar'
import DisplayText from './editLessonComp/DisplayText'
import SuggestBox from './editLessonComp/SuggestBox'
import { useNavigate, useParams } from 'react-router-dom'
import { editGenerateLesson, fetchGenerated, getPromptAddition } from '../../../api'
import { alertActions } from '../../../components/alertActions'
// import { lessonActions } from '../../../store/lessonSlice'
import CenterModal from '../../../components/CenterModal'
import BackModal from './editLessonComp/BackModal'
import { useDispatch } from 'react-redux'
import { lessonActions } from '../../../store/lessonSlice'
import PulseAnimate from '../../../utilities/loading'
import { useSelector } from 'react-redux'

const EditLessonNote = () => {
  const {id} = useParams()
  const [active, setActive] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [lesson, setLesson] = useState<any>()
  const [currentVal, setCurrentVal] = useState('')
  const [fullLoading, setFullLoading] = useState(false)
  const backLesson = useSelector((state:any) => state.lesson.generatedNote.past)
  const forwardLesson = useSelector((state:any) => state.lesson.generatedNote.forward)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fetchLessonNote = (id:any) => {
    fetchGenerated(id)
    .then((res:any) => {
      if(!res.error){
        setLesson(res.data)
        dispatch(lessonActions.saveNote(res.data.generated))
        dispatch(lessonActions.savePastNote(res.data.generated))
      }else{
        alertActions.error(res.message)
      }
    })
    .catch((err:any) => {
      console.log(err);
    })
  }
  useEffect(() => {
    fetchLessonNote(id)
  },[id])
  const [activeSlide, setActiveSlide] = useState()
  const changeSlide = (item:any) => {
    setActiveSlide(item)
  }
  const showBackModal = () => {
    setActive(true)
  }
  const updateLessonNote = () => {
    setIsBusy(true)
    const payload = {
      generated: currentVal
    }
    if(currentVal === backLesson){
      navigate(`/lessons/${lesson.SubjectId}/${lesson.GroupId}`)
    }else{
      editGenerateLesson(payload, id)
      .then((res:any) => {
        if(!res.error){
          alertActions.success('Lesson note saved succcessfully')
          navigate(`/lessons/${lesson.SubjectId}/${lesson.GroupId}`)
        }else{
          alertActions.error(res.message)
          setIsBusy(false)
        }
      })
      .catch((err:any) => {
        console.log(err);
        setIsBusy(false)
      })
    }
  }

  const promptReply = async(item:any) => {
    setIsUpdating(true)
    setFullLoading(true)
    const payload = {
      query: item,
      session_id: lesson.session_id
    }
    await getPromptAddition(payload, id)
    .then((res:any) => {
      if(res.status === "success"){
        dispatch(lessonActions.saveNote(res.data))
        dispatch(lessonActions.saveFutureNote(res.data))
        setIsUpdating(false)
        setFullLoading(false)
      }else{
        alertActions.error(res.message)
        setIsUpdating(false)
        setFullLoading(false)
      }
    })
    .catch((err:any) => {
      console.log(err);
      setIsUpdating(false)
      setFullLoading(false)
    })
  }

  const displayPrevious = () => {
    dispatch(lessonActions.saveNote(backLesson))
  }
  const displayForward = () => {
    dispatch(lessonActions.saveNote(forwardLesson))
  }
  
  return (
    <>
        <div>
            <div className='absolute left-0 top-0 bg-white w-full'>
                <EditLessonHeader back={showBackModal} next={displayForward} prev={displayPrevious}  lesson={lesson}/>
            </div>
            <div className='flex h-screen pt-[90px]'>
                <div className='w-[23%]'>
                <EditLessonSideBar data={lesson} change={changeSlide} active={activeSlide}/>
                </div>
                <div className='relative flex w-full h-full overflow-y-auto edit-scroll bg-[#F4F3FF] p-8'>
                  <div className='w-8/12'>
                    <DisplayText data={activeSlide} lesson={lesson} getValue={setCurrentVal}/>
                  </div>
                  <div className='w-4/12 pl-5'>
                    <SuggestBox prompt={promptReply} isBusy={isUpdating}/>
                  </div>
                </div>
            </div>
        </div>
        {
          fullLoading && (
            <div className='fixed top-0 left-0 bg-loading w-screen h-screen flex justify-center items-center'>
              <PulseAnimate color='#4F46E5' size={20}/>
            </div>
          )
        }
        <CenterModal
        isOpen={active}
        onClose={() => setActive(false)}
        variant={"small"}
        >
          <BackModal isBusy={isBusy} update={updateLessonNote} close={() => setActive(false)}/>
        </CenterModal>
    </>
  )
}

export default EditLessonNote