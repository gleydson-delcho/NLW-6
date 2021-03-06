import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export function NewRoom() {

    const history = useHistory();
    const { user } = useAuth();
    const { theme } = useTheme()
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        
        if(newRoom.trim() === '') {
            return;
        }

        const dataRoom = {
            title: newRoom,
            authorId: user?.id
        };
        
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push(dataRoom);

        history.push(`/admin/rooms/${firebaseRoom.key}`);
    }

    return(
        <div id="page-auth" className={theme}>
            <aside>
                <img src={illustrationImg} alt="Ilustration" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo" />
                    <h2>Criar uma nova sala</h2>                   
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar uma sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>

    );
}