import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { database } from '../services/firebase';
import { useTheme } from '../hooks/useTheme';
import { ThemeButton } from '../components/ThemeButton';


export function Home() {

    const history = useHistory();
    // const [isActive, setIsActive] = useState(false);
    // const [classToggle, setClassToggle] = useState('')
    const [roomCode, setRoomCode] = useState('');
    const { user, signInWithGoogle } = useAuth();

    const { theme } = useTheme();
    // function buttonToggle() {
    //     if(isActive === false) {
    //         setIsActive(true);
    //         setClassToggle('active');
    //     }else{
    //         setIsActive(false);
    //     }
    // }

    const handleCreateRoom = async () => {

        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('This room does not exists.')
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already closed!');
            return;
        }

        history.push(`/rooms/${roomCode}`);

    }

    return (
        <div id="page-auth" className={theme}>
            <aside>
                {/* <button className="button-toggle" onClick={buttonToggle}>
                </button> */}
                <img src={illustrationImg} alt="Ilustration" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as d??vidas da sua audi??ncia em tempo-real</p>

            </aside>
            <main className="main-large">
                <div className="main-content">
                    <div className="button-theme">
                        <ThemeButton />
                    </div>
                    <img src={logoImg} alt="Logo" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="logo google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o c??digo da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
            {/* {
                isActive ?
                <main className={`${classToggle}`}>
                    <div className="main-content">
                        <img src={logoImg} alt="Logo" />
                        <button className="create-room" onClick={handleCreateRoom}>
                            <img src={googleIconImg} alt="logo google" />
                            Crie sua sala com o Google
                        </button>
                        <div className="separator">Ou entre em uma sala</div>
                        <form onSubmit={handleJoinRoom}>
                            <input
                                type="text"
                                placeholder="Digite o c??digo da sala"
                                onChange={event => setRoomCode(event.target.value)}
                                value={roomCode}
                            />
                            <Button type="submit">
                                Entrar na sala
                            </Button>
                        </form>
                    </div>
                </main>
                :
                null
            } */}
        </div>

    );
}