import { useHistory, useParams } from 'react-router-dom';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push('/');
    }

    async function handleDeleteQuestion(quesionId: string) {
        if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${quesionId}`).remove();
        }
    }
    async function handleCheckQuestionAsAnswered(quesionId: string) {
        await database.ref(`rooms/${roomId}/questions/${quesionId}`).update({
            isAnswered: true
        });

    }
    async function handleHighlightQuestion(quesionId: string) {
        await database.ref(`rooms/${roomId}/questions/${quesionId}`).update({
            isHighlighted: true
        });
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta{questions.length > 1 && <span>s</span>}</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {
                                    !question.isAnswered &&
                                    ( 
                                    <>
                                    <button
                                    type="button"
                                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                    >
                                    <img src={checkImg} alt="Marcar como respondida" />
                                    </button>
                                    <button
                                    type="button"
                                    onClick={() => handleHighlightQuestion(question.id)}
                                    >
                                    <img src={answerImg} alt="Destacar a pergunta" />
                                    </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="excluir" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}