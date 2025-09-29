CREATE DATABASE IF NOT EXISTS sistema_tcc;
USE sistema_tcc;

CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    tipo_usuario ENUM('aluno', 'professor', 'coordenador') NOT NULL
);

CREATE TABLE Aluno (
    idAluno INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(45) NOT NULL,
    curso VARCHAR(45) NOT NULL,
    Usuario_idUsuario INT NOT NULL,
    FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Professor (
    idProfessor INT AUTO_INCREMENT PRIMARY KEY,
    area VARCHAR(45) NOT NULL,
    Usuario_idUsuario INT NOT NULL,
    FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
);


CREATE TABLE Coordenador (
    idCoordenador INT AUTO_INCREMENT PRIMARY KEY,
    departamento VARCHAR(100) NOT NULL,
    Usuario_idUsuario INT NOT NULL,
    FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Banca (
    idBanca INT AUTO_INCREMENT PRIMARY KEY,
    data DATETIME NOT NULL, 
    local VARCHAR(200) NOT NULL
);

CREATE TABLE TrabalhoConclusao (
    idTrabalhoConclusao INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descricao LONGTEXT,
    status ENUM('em_andamento', 'concluido', 'cancelado') NOT NULL,
    Aluno_idAluno INT NOT NULL,
    Banca_idBanca INT,
    FOREIGN KEY (Aluno_idAluno) REFERENCES Aluno(idAluno),
    FOREIGN KEY (Banca_idBanca) REFERENCES Banca(idBanca)
);

CREATE TABLE Orientacao (
    idOrientacao INT AUTO_INCREMENT PRIMARY KEY,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    Professor_idProfessor INT NOT NULL,
    Aluno_idAluno INT NOT NULL,
    FOREIGN KEY (Professor_idProfessor) REFERENCES Professor(idProfessor),
    FOREIGN KEY (Aluno_idAluno) REFERENCES Aluno(idAluno)
);

CREATE TABLE Professor_has_Banca (
    Professor_idProfessor INT NOT NULL,
    Banca_idBanca INT NOT NULL,
    TrabalhoConclusao_idTrabalhoConclusao INT NOT NULL,
    PRIMARY KEY (Professor_idProfessor, Banca_idBanca, TrabalhoConclusao_idTrabalhoConclusao),
    FOREIGN KEY (Professor_idProfessor) REFERENCES Professor(idProfessor),
    FOREIGN KEY (Banca_idBanca) REFERENCES Banca(idBanca),
    FOREIGN KEY (TrabalhoConclusao_idTrabalhoConclusao) REFERENCES TrabalhoConclusao(idTrabalhoConclusao)
);

CREATE TABLE Avaliacao (
    idAvaliacao INT AUTO_INCREMENT PRIMARY KEY,
    nota DECIMAL(4,2) NOT NULL,
    comentario TEXT,
    data_avaliacao DATETIME NOT NULL,
    Professor_idProfessor INT NOT NULL,
    TrabalhoConclusao_idTrabalhoConclusao INT NOT NULL,
    FOREIGN KEY (Professor_idProfessor) REFERENCES Professor(idProfessor),
    FOREIGN KEY (TrabalhoConclusao_idTrabalhoConclusao) REFERENCES TrabalhoConclusao(idTrabalhoConclusao)
);


CREATE TABLE Cronograma (
    idCronograma INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_evento DATETIME NOT NULL,
    tipo_evento ENUM('reuniao', 'defesa', 'entrega_parcial', 'outro') NOT NULL,
    Aluno_idAluno INT,
    Professor_idProfessor INT,
    FOREIGN KEY (Aluno_idAluno) REFERENCES Aluno(idAluno),
    FOREIGN KEY (Professor_idProfessor) REFERENCES Professor(idProfessor)
);

CREATE TABLE Alerta (
    idAlerta INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    status ENUM('ativo', 'inativo') NOT NULL,
    data_criacao DATETIME NOT NULL,
    Usuario_idUsuario INT NOT NULL,
    FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Atividade_Recente (
    idAtividade_recente INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_atividade DATETIME NOT NULL,
    Usuario_idUsuario INT NOT NULL,
    FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
);
