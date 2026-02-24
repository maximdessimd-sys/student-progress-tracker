import { useState, useEffect } from 'react';

export default function IndexPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudentName, setNewStudentName] = useState('');

  const [sessionDate, setSessionDate] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');
  const [sessionTopic, setSessionTopic] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [sessionHomework, setSessionHomework] = useState('');
  const [sessionKeyMoments, setSessionKeyMoments] = useState('');
  const [sessionCEFR, setSessionCEFR] = useState({
    speaking: '',
    writing: '',
    listening: '',
    reading: '',
    vocab: '',
    grammar: '',
    pronunciation: '',
    fluency: ''
  });

  const [goalText, setGoalText] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');

  // Load from localStorage
  useEffect(() => {
    const data = localStorage.getItem('studentsData');
    if (data) {
      setStudents(JSON.parse(data));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('studentsData', JSON.stringify(students));
  }, [students]);

  const addStudent = () => {
    if (!newStudentName.trim()) return;
    const newStudent = {
      id: Date.now(),
      name: newStudentName.trim(),
      sessions: [],
      goals: []
    };
    setStudents([...students, newStudent]);
    setNewStudentName('');
  };

  const selectStudent = (student) => {
    setSelectedStudent(student);
  };

  const addSession = () => {
    if (!selectedStudent) return;
    const updatedStudents = students.map((s) => {
      if (s.id === selectedStudent.id) {
        const newSession = {
          id: Date.now(),
          date: sessionDate,
          duration: sessionDuration,
          topic: sessionTopic,
          notes: sessionNotes,
          homework: sessionHomework,
          keyMoments: sessionKeyMoments,
          cefr: sessionCEFR
        };
        return { ...s, sessions: [...s.sessions, newSession] };
      }
      return s;
    });
    setStudents(updatedStudents);
    setSessionDate('');
    setSessionDuration('');
    setSessionTopic('');
    setSessionNotes('');
    setSessionHomework('');
    setSessionKeyMoments('');
    setSessionCEFR({
      speaking: '',
      writing: '',
      listening: '',
      reading: '',
      vocab: '',
      grammar: '',
      pronunciation: '',
      fluency: ''
    });
  };

  const addGoal = () => {
    if (!selectedStudent || !goalText.trim()) return;
    const updatedStudents = students.map((s) => {
      if (s.id === selectedStudent.id) {
        const newGoal = {
          id: Date.now(),
          text: goalText.trim(),
          deadline: goalDeadline,
          done: false
        };
        return { ...s, goals: [...s.goals, newGoal] };
      }
      return s;
    });
    setStudents(updatedStudents);
    setGoalText('');
    setGoalDeadline('');
  };

  const toggleGoal = (goalId) => {
    if (!selectedStudent) return;
    const updatedStudents = students.map((s) => {
      if (s.id === selectedStudent.id) {
        const updatedGoals = s.goals.map((g) =>
          g.id === goalId ? { ...g, done: !g.done } : g
        );
        return { ...s, goals: updatedGoals };
      }
      return s;
    });
    setStudents(updatedStudents);
  };

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <h2>Studenten</h2>
        <ul>
          {students.map((student) => (
            <li
              key={student.id}
              onClick={() => selectStudent(student)}
              style={{
                cursor: 'pointer',
                fontWeight: selectedStudent?.id === student.id ? 'bold' : 'normal'
              }}
            >
              {student.name}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Nieuwe student naam"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
        />
        <button onClick={addStudent}>Toevoegen</button>
      </div>

      {selectedStudent && (
        <div style={{ flex: 2 }}>
          <h2>Voortgang van {selectedStudent.name}</h2>

          <h3>Sessies</h3>
          <ul>
            {selectedStudent.sessions.map((session) => (
              <li key={session.id}>
                {session.date} - {session.duration} uur - {session.topic}
              </li>
            ))}
          </ul>
          <div>
            <h4>Nieuwe sessie</h4>
            <input
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
            />
            <input
              type="number"
              placeholder="Duur (uren)"
              value={sessionDuration}
              onChange={(e) => setSessionDuration(e.target.value)}
            />
            <input
              type="text"
              placeholder="Topic"
              value={sessionTopic}
              onChange={(e) => setSessionTopic(e.target.value)}
            />
            <textarea
              placeholder="Notities"
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
            />
            <textarea
              placeholder="Huiswerk"
              value={sessionHomework}
              onChange={(e) => setSessionHomework(e.target.value)}
            />
            <textarea
              placeholder="Key moments"
              value={sessionKeyMoments}
              onChange={(e) => setSessionKeyMoments(e.target.value)}
            />

            {/* CEFR snapshot */}
            <div>
              <h5>CEFR-snapshot</h5>
              <label>
                Mondeling begrip:
                <select
                  value={sessionCEFR.listening}
                  onChange={(e) =>
                    setSessionCEFR({ ...sessionCEFR, listening: e.target.value })
                  }
                >
                  <option value="">--</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </label>
              <label>
                Mondeling expressie:
                <select
                  value={sessionCEFR.speaking}
                  onChange={(e) =>
                    setSessionCEFR({ ...sessionCEFR, speaking: e.target.value })
                  }
                >
                  <option value="">--</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </label>
              <label>
                Schriftelijk begrip:
                <select
                  value={sessionCEFR.reading}
                  onChange={(e) =>
                    setSessionCEFR({ ...sessionCEFR, reading: e.target.value })
                  }
                >
                  <option value="">--</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </label>
              <label>
                Schriftelijk expressie:
                <select
                  value={sessionCEFR.writing}
                  onChange={(e) =>
                    setSessionCEFR({ ...sessionCEFR, writing: e.target.value })
                  }
                >
                  <option value="">--</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </label>
              <label>
                Woordenschat professioneel:
                <select
                  value={sessionCEFR.vocab}
                  onChange={(e) =>
                    setSessionCEFR({ ...sessionCEFR, vocab: e.target.value })
                  }
                >
                  <option value="">--</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </label>
              <label>
                Grammatica:
                <select
                  value={sessionCEFR.grammar}
                  onChange={(e) =>
                    setSessionCEFR({ ...sessionCEFR, grammar: e.target.value })
                  }
                >
                  <option value="">--</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </label>
              <label>
                Uitspraak:
                <select
                  value={sessionCEFR.pronunciation}
                  onChange={(e) =>
                    setSessionCEFR({ ...sessionCEFR, pronunciation: e.target.value })
                  }
                >
                  <option value="">--</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </label>
              <label>
                Vlotheid:
                <select
                  value={sessionCEFR.fluency}
                  onChange={(e) =>
                    setSessionCEFR({ ...sessionCEFR, fluency: e.target.value })
                  }
                >
                  <option value="">--</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </label>
            </div>

            <button onClick={addSession}>Sessies toevoegen</button>
          </div>

          <h3>Doelen</h3>
          <ul>
            {selectedStudent.goals.map((goal) => (
                   <span
              style={{
                textDecoration: goal.done ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => toggleGoal(goal.id)}
            >
              {goal.text} (deadline: {goal.deadline || 'geen'})
            </span>
              </li>
            ))}
          </ul>
          <div>
            <h4>Nieuw doel</h4>
            <input
              type="text"
              placeholder="Doel"
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
            />
            <input
              type="date"
              value={goalDeadline}
              onChange={(e) => setGoalDeadline(e.target.value)}
            />
            <button onClick={addGoal}>Doel toevoegen</button>
          </div>
        </div>
      )}
    </div>
  );
}
