import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.css';
import {Card, Container} from "@material-ui/core";
import QuestionSlide from "./question-slide/QuestionSlide";
import './millionaire.css'

function Millionaire() {
  const questionsObjects = [
    {"category":"RW50ZXJ0YWlubWVudDogVmlkZW8gR2FtZXM=","type":"bXVsdGlwbGU=","difficulty":"bWVkaXVt","question":"V2hlbiB3YXMgdGhlIHZpZGVvIGdhbWUgcHVibGlzaGVyICJVYmlzb2Z0IiBmb3VuZGVkID8=","correct_answer":"TWFyY2ggMTk4Ng==","incorrect_answers":["QXByaWwgMTk5MA==","SnVuZSAyMDAx","QXVndXN0IDE5NTY="]},
    {"category":"RW50ZXJ0YWlubWVudDogTXVzaWM=","type":"bXVsdGlwbGU=","difficulty":"ZWFzeQ==","question":"V2hpY2ggcHVuayByb2NrIGJhbmQgcmVsZWFzZWQgaGl0IHNvbmdzIHN1Y2ggYXMgIkNhbGlmb3JuaWNhdGlvbiIsICJDYW4ndCBTdG9wIiBhbmQgIlVuZGVyIHRoZSBCcmlkZ2UiPw==","correct_answer":"UmVkIEhvdCBDaGlsbGkgUGVwcGVycw==","incorrect_answers":["R3JlZW4gRGF5","TGlua2luIFBhcms=","Rm9vIEZpZ2h0ZXJz"]},
    {"category":"RW50ZXJ0YWlubWVudDogRmlsbQ==","type":"bXVsdGlwbGU=","difficulty":"ZWFzeQ==","question":"V2hvIGluIFB1bHAgRmljdGlvbiBzYXlzICJObywgdGhleSBnb3QgdGhlIG1ldHJpYyBzeXN0ZW0gdGhlcmUsIHRoZXkgd291bGRuJ3Qga25vdyB3aGF0IHRoZSBmdWNrIGEgUXVhcnRlciBQb3VuZGVyIGlzLiI=","correct_answer":"VmluY2VudCBWZWdh","incorrect_answers":["SnVsZXMgV2lubmZpZWxk","SmltbWllIERpbW1pY2s=","QnV0Y2ggQ29vbGlkZ2U="]}
  ];

  const questionSlides = questionsObjects.map(questionObj => (<div className={'question-slide'}>
    <QuestionSlide questionObj={ questionObj }/>
  </div>))

  const handleChange = event => {
    console.log('handleChange', event)
  }
  const handleClickItem = event => {
    console.log('handleClickItem', event)
  }

  const handleClickThumb = event => {
    console.log(event);
  }
  return (
    <Container fixed className={'container'}>
      <Carousel showArrows={true} onChange={handleChange} onClickItem={handleClickItem} onClickThumb={handleClickThumb}>
        { questionSlides }
      </Carousel>

    </Container>
  );
}
export default Millionaire;
