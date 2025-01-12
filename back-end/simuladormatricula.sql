-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 12/01/2025 às 14:18
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `simuladormatricula`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `aluno`
--

CREATE TABLE `aluno` (
  `id_aluno` int(11) NOT NULL,
  `matricula` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `materia`
--

CREATE TABLE `materia` (
  `codigo` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `carga_horaria` varchar(255) NOT NULL,
  `pre_requisitos` varchar(255) DEFAULT NULL,
  `co_requisitos` varchar(255) DEFAULT NULL,
  `periodo` varchar(255) NOT NULL,
  `local` varchar(255) DEFAULT NULL,
  `horario` varchar(255) NOT NULL,
  `componente` varchar(255) NOT NULL,
  `id_professor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `materia`
--

INSERT INTO `materia` (`codigo`, `nome`, `carga_horaria`, `pre_requisitos`, `co_requisitos`, `periodo`, `local`, `horario`, `componente`, `id_professor`) VALUES
('G03ACEL1.01', 'ANÁLISE DE CIRCUITOS ELÉTRICOS I', '60h', NULL, NULL, '4', NULL, '', 'Componente Placeholder', 1),
('G03ACEL2.01', 'ANÁLISE DE CIRCUITOS ELÉTRICOS II', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 1),
('G03ACOM0.02', 'ARQUITETURA DE COMPUTADORES', '60h', NULL, NULL, '7', NULL, '', 'Componente Placeholder', 1),
('G03AEDA0.01', 'ALGORITMOS E ESTRUTURAS DE DADOS', '60h', NULL, NULL, '2', NULL, '', 'Componente Placeholder', 1),
('G03AGRA0.02', 'ALGORITMOS EM GRAFOS', '60h', NULL, NULL, '7', NULL, '', 'Componente Placeholder', 2),
('G03ALIN0.01', 'ÁLGEBRA LINEAR', '60h', NULL, NULL, '4', NULL, '', 'Componente Placeholder', 2),
('G03APAL0.01', 'ANÁLISE E PROJETO DE ALGORITMOS', '60h', NULL, NULL, '4', NULL, '', 'Componente Placeholder', 3),
('G03APC00.01', 'ALGORITMOS E PROGRAMAÇÃO DE COMPUTADORES', '60h', NULL, NULL, '1', NULL, '', 'Componente Placeholder', 1),
('G03BDAD0.02', 'BANCO DE DADOS', '60h', NULL, NULL, '3', NULL, '', 'Componente Placeholder', 1),
('G03BDIC0.02', 'BANCO DE DADOS PARA INTERNET DAS COISAS', '45h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 2),
('G03C SPEC1.01', 'CONTEXTO SOCIAL E PROFISSIONAL DA ENGENHARIA DA COMPUTAÇÃO', '30h', NULL, NULL, '1', NULL, '', 'Componente Placeholder', 3),
('G03CAUT1.02', 'CONTROLE AUTOMÁTICO I', '90h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 3),
('G03CAUT2.02', 'CONTROLE AUTOMÁTICO II', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 4),
('G03CEVO0.02', 'COMPUTAÇÃO EVOLUCIONISTA', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 5),
('G03CFVC0.01', 'CÁLCULO COM FUNÇÕES DE UMA VARIÁVEL COMPLEXA', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 6),
('G03CFVR0.01', 'CÁLCULO COM FUNÇÕES DE UMA VARIÁVEL REAL', '90h', NULL, NULL, '1', NULL, '', 'Componente Placeholder', 2),
('G03CFVV1.01', 'CÁLCULO COM FUNÇÕES DE VÁRIAS VARIÁVEIS I', '60h', NULL, NULL, '2', NULL, '', 'Componente Placeholder', 2),
('G03CFVV2.01', 'CÁLCULO COM FUNÇÕES DE VÁRIAS VARIÁVEIS II', '60h', NULL, NULL, '3', NULL, '', 'Componente Placeholder', 2),
('G03CGRA0.02', 'COMPUTAÇÃO GRÁFICA', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 7),
('G03COMP0.02', 'COMPILADORES', '60h', NULL, NULL, '8', NULL, '', 'Componente Placeholder', 1),
('G03DASI0.01', 'DESENVOLVIMENTO ÁGIL DE SISTEMAS', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 1),
('G03DWEB1.01', 'DESENVOLVIMENTO WEB I', '30h', NULL, NULL, '2', NULL, '', 'Componente Placeholder', 3),
('G03DWEB2.01', 'DESENVOLVIMENTO WEB II', '60h', NULL, NULL, '4', NULL, '', 'Componente Placeholder', 4),
('G03EAAU0.01', 'ECONOMIA APLICADA À AUTOMAÇÃO', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 2),
('G03EAPR0.01', 'ELETRÔNICA APLICADA A PROJETOS', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 3),
('G03ECOB1.01', 'ESTÁGIO CURRICULAR OBRIGATÓRIO - ENGENHARIA DE COMPUTAÇÃO', '195h', NULL, NULL, '10', NULL, '', 'Componente Placeholder', 1),
('G03EDOR0.01', 'EQUAÇÕES DIFERENCIAIS ORDINÁRIAS', '60h', NULL, NULL, '3', NULL, '', 'Componente Placeholder', 3),
('G03EDPA0.01', 'EQUAÇÕES DIFERENCIAIS PARCIAIS', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 4),
('G03ELET1.01', 'ELETRÔNICA I', '60h', NULL, NULL, '5', NULL, '', 'Componente Placeholder', 1),
('G03ELET2.01', 'ELETRÔNICA II', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 5),
('G03EMNE0.01', 'EMPREENDEDORISMO E MODELO DE NEGÓCIOS', '30h', NULL, NULL, '8', NULL, '', 'Componente Placeholder', 2),
('G03EPOT0.01', 'ELETRÔNICA DE POTÊNCIA', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 6),
('G03ESOF1.02', 'ENGENHARIA DE SOFTWARE I', '60h', NULL, NULL, '5', NULL, '', 'Componente Placeholder', 2),
('G03ESOF2.02', 'ENGENHARIA DE SOFTWARE II', '60h', NULL, NULL, '6', NULL, '', 'Componente Placeholder', 1),
('G03ESTA0.01', 'ESTATÍSTICA', '60h', NULL, NULL, '3', NULL, '', 'Componente Placeholder', 4),
('G03ESUP1.02', 'ESTÁGIO SUPERVISIONADO - ENGENHARIA DE COMPUTAÇÃO', '15h', NULL, NULL, '10', NULL, '', 'Componente Placeholder', 2),
('G03FAGRO0.01', 'FUNDAMENTOS DO AGRONEGÓCIO', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 7),
('G03FEEL0.01', 'FÍSICA EXPERIMENTAL - ELETROMAGNETISMO', '30h', NULL, NULL, '4', NULL, '', 'Componente Placeholder', 5),
('G03FELE0.01', 'FUNDAMENTOS DE ELETROMAGNETISMO', '60h', NULL, NULL, '4', NULL, '', 'Componente Placeholder', 6),
('G03FEME0.01', 'FÍSICA EXPERIMENTAL - MECÂNICA', '30h', NULL, NULL, '2', NULL, '', 'Componente Placeholder', 4),
('G03FEOF0.01', 'FÍSICA EXPERIMENTAL - OSCILAÇÕES, FLUIDOS E TERMODINÂMICA-(OFT)', '30h', NULL, NULL, '3', NULL, '', 'Componente Placeholder', 5),
('G03FFMO0.01', 'FUNDAMENTOS DE FÍSICA MODERNA', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 1),
('G03FMEC0.01', 'FUNDAMENTOS DE MECÂNICA', '60h', NULL, NULL, '2', NULL, '', 'Componente Placeholder', 5),
('G03FOFT0.01', 'FUNDAMENTOS DE OSCILAÇÕES, FLUIDOS E TERMODINÂMICA', '60h', NULL, NULL, '3', NULL, '', 'Componente Placeholder', 6),
('G03FSSI0.01', 'FUNDAMENTOS DE SINAIS E SISTEMAS', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 2),
('G03FTEC0.01', 'FILOSOFIA DA TECNOLOGIA', '30h', NULL, NULL, '3', NULL, '', 'Componente Placeholder', 7),
('G03GAALO.01', 'GEOMETRIA ANALÍTICA E ÁLGEBRA LINEAR', '60h', NULL, NULL, '1', NULL, '', 'Componente Placeholder', 4),
('G03GAMB0.01', 'GESTÃO AMBIENTAL', '30h', NULL, NULL, '8', NULL, '', 'Componente Placeholder', 3),
('G03IADM0.01', 'INTRODUÇÃO À ADMINISTRAÇÃO', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 3),
('G03IART0.02', 'INTELIGÊNCIA ARTIFICIAL', '60h', NULL, NULL, '8', NULL, '', 'Componente Placeholder', 4),
('G03IDIR0.02', 'INTRODUÇÃO AO DIREITO', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 4),
('G03IEECO.01', 'INTRODUÇÃO À EXPERIMENTAÇÃO EM ENGENHARIA DA COMPUTAÇÃO', '30h', NULL, NULL, '1', NULL, '', 'Componente Placeholder', 5),
('G03IESE0.02', 'INTRODUÇÃO À ENGENHARIA DE SEGURANÇA', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 5),
('G03IICO0.02', 'INTRODUÇÃO À INTERNET DAS COISAS', '45h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 6),
('G03IIND0.02', 'INSTRUMENTAÇÃO INDUSTRIAL', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 7),
('G03IINS2.01', 'INGLÊS INSTRUMENTAL II', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 1),
('G03INFCO.01', 'LÓGICA E FUNDAMENTOS PARA COMPUTAÇÃO', '60h', NULL, NULL, '1', NULL, '', 'Componente Placeholder', 7),
('G03INIS1.01', 'INGLÊS INSTRUMENTAL I', '30h', NULL, NULL, '1', NULL, '', 'Componente Placeholder', 6),
('G03ISER0.01', 'INTEGRAÇÃO E SÉRIES', '60h', NULL, NULL, '2', NULL, '', 'Componente Placeholder', 6),
('G03ISOC0.01', 'INTRODUÇÃO À SOCIOLOGIA', '30h', NULL, NULL, '7', NULL, '', 'Componente Placeholder', 3),
('G03LCAU1.01', 'LABORATÓRIO DE CONTROLE AUTOMÁTICO I', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 2),
('G03LCAU2.01', 'LABORATÓRIO DE CONTROLE AUTOMÁTICO II', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 3),
('G03LCEL0.01', 'LABORATÓRIO DE CIRCUITOS ELÉTRICOS', '30h', NULL, NULL, '4', NULL, '', 'Componente Placeholder', 7),
('G03LELE1.01', 'LABORATÓRIO DE ELETRÔNICA I', '30h', NULL, NULL, '5', NULL, '', 'Componente Placeholder', 3),
('G03LEPO0.01', 'LABORATÓRIO DE ELETRÔNICA DE POTÊNCIA', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 4),
('G03LFAU0.02', 'LINGUAGENS FORMAIS E AUTÔMATOS', '60h', NULL, NULL, '6', NULL, '', 'Componente Placeholder', 2),
('G03LIBR1.02', 'LIBRAS I', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 5),
('G03LIBR2.02', 'LIBRAS II', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 6),
('G03LIIN0.01', 'LABORATÓRIO DE INSTRUMENTAÇÃO INDUSTRIAL', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 7),
('G03LPRO0.02', 'LINGUAGENS DE PROGRAMAÇÃO', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 1),
('G03LPSE0.01', 'LABORATÓRIO DE PROGRAMAÇÃO DE SISTEMAS EMBARCADOS', '30h', NULL, NULL, '8', NULL, '', 'Componente Placeholder', 5),
('G03LQUI0.01', 'LABORATÓRIO DE QUÍMICA', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 2),
('G03LSDI0.01', 'LABORATÓRIO DE SISTEMAS DIGITAIS', '30h', NULL, NULL, '5', NULL, '', 'Componente Placeholder', 4),
('G03LSTR0.03', 'LABORATÓRIO DE SISTEMAS DE TEMPO REAL', '30h', NULL, NULL, '7', NULL, '', 'Componente Placeholder', 4),
('G03MADE0.02', 'MODELAGEM E AVALIAÇÃO DE DESEMPENHO', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 3),
('G03MCCE0.01', 'MODELAGEM E CONTROLE DE CONVERSORES ESTÁTICOS', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 4),
('G03MCIE0.01', 'METODOLOGIA CIENTÍFICA', '30h', NULL, NULL, '6', NULL, '', 'Componente Placeholder', 3),
('G03MDIS0.02', 'MATEMÁTICA DISCRETA', '60h', NULL, NULL, '2', NULL, '', 'Componente Placeholder', 7),
('G03MELE0.01', 'MATERIAIS ELÉTRICOS', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 5),
('G03MNUM1.02', 'MÉTODOS NUMÉRICOS I', '60h', NULL, NULL, '5', NULL, '', 'Componente Placeholder', 5),
('G03MNUM2.02', 'MÉTODOS NUMÉRICOS II', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 6),
('G03MPEC0.01', 'METODOLOGIA DA PESQUISA - ENG COMPUTAÇÃO - LP', '30h', NULL, NULL, '9', NULL, '', 'Componente Placeholder', 1),
('G03NQIN0.01', 'NORMALIZAÇÃO E QUALIDADE INDUSTRIAL', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 7),
('G03OCOM0.02', 'ORGANIZAÇÃO DE COMPUTADORES', '60h', NULL, NULL, '6', NULL, '', 'Componente Placeholder', 4),
('G03OEMP0.01', 'ORGANIZAÇÃO EMPRESARIAL', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 1),
('G03PAOR0.01', 'PSICOLOGIA APLICADA ÀS ORGANIZAÇÕES', '30h', NULL, NULL, '8', NULL, '', 'Componente Placeholder', 6),
('G03PDIM0.02', 'PROCESSAMENTO DIGITAL DE IMAGENS', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 2),
('G03PDMO0.01', 'PROGRAMAÇÃO PARA DISPOSITIVOS MÓVEIS', '60h', NULL, NULL, '6', NULL, '', 'Componente Placeholder', 5),
('G03POOB0.01', 'PROGRAMAÇÃO ORIENTADA A OBJETOS', '60h', NULL, NULL, '3', NULL, '', 'Componente Placeholder', 7),
('G03POPE0.02', 'PESQUISA OPERACIONAL', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 3),
('G03PSEM0.01', 'PROGRAMAÇÃO DE SISTEMAS EMBARCADOS', '30h', NULL, NULL, '8', NULL, '', 'Componente Placeholder', 7),
('G03QUIM0.01', 'QUÍMICA', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 4),
('G03RCOMP0.03', 'REDES DE COMPUTADORES', '60h', NULL, NULL, '6', NULL, '', 'Componente Placeholder', 6),
('G03RNAR0.02', 'REDES NEURAIS ARTIFICIAIS', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 5),
('G03RSSF0.02', 'REDES DE SENSORES SEM FIO', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 6),
('G03SDIG0.01', 'SISTEMAS DIGITAIS', '60h', NULL, NULL, '5', NULL, '', 'Componente Placeholder', 6),
('G03SDIS0.03', 'SISTEMAS DISTRIBUÍDOS', '60h', NULL, NULL, '7', NULL, '', 'Componente Placeholder', 5),
('G03SOPE1.03', 'SISTEMAS OPERACIONAIS I', '60h', NULL, NULL, '5', NULL, '', 'Componente Placeholder', 7),
('G03SOPE2.03', 'SISTEMAS OPERACIONAIS II', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 7),
('G03STRE0.03', 'SISTEMAS DE TEMPO REAL', '30h', NULL, NULL, '7', NULL, '', 'Componente Placeholder', 6),
('G03TCCU1.01', 'TRABALHO DE CONCLUSÃO DE CURSO I', '15h', NULL, NULL, '9', NULL, '', 'Componente Placeholder', 2),
('G03TCCU2.01', 'TRABALHO DE CONCLUSÃO DE CURSO II', '15h', NULL, NULL, '10', NULL, '', 'Componente Placeholder', 3),
('G03TCOM0.02', 'TEORIA DA COMPUTAÇÃO', '60h', NULL, NULL, '7', NULL, '', 'Componente Placeholder', 7),
('G08IECO0.01', 'INTRODUÇÃO À ECONOMIA', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 1),
('GT03ELE003.1', 'TÓPICOS ESPECIAIS EM ELETRÔNICA: PROJETOS MICROCONTROLADOS COM INTERFACE DE REDE DE DADOS WIFI E ETHERNET', '30h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 2),
('GT03FEC001.1', 'TÓPICOS ESPECIAIS EM FUNDAMENTOS DE ENGENHARIA DE COMPUTAÇÃO: PROGRAMAÇÃO COMPETITIVA', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 3),
('GT03LEI003.1', 'TÓPICOS ESPECIAIS EM LINGUAGENS DE PROGRAMAÇÃO: DESENVOLVIMENTO DE APLICAÇÕES PARA AMBIENTES MOBILE E WEB', '60h', NULL, NULL, 'OPTATIVO', NULL, '', 'Componente Placeholder', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `matriculas`
--

CREATE TABLE `matriculas` (
  `id_matricula` int(11) NOT NULL,
  `id_aluno` int(11) NOT NULL,
  `codigo_materia` varchar(255) NOT NULL,
  `data_cadastro` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `professor`
--

CREATE TABLE `professor` (
  `id_professor` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `ingresso` varchar(255) NOT NULL,
  `vinculo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `professor`
--

INSERT INTO `professor` (`id_professor`, `nome`, `ingresso`, `vinculo`, `email`) VALUES
(1, 'Professor 1', '2025-01-01', 'Efetivo', 'professor1@email.com'),
(2, 'Professor 2', '2025-01-02', 'Efetivo', 'professor2@email.com'),
(3, 'Professor 3', '2025-01-03', 'Efetivo', 'professor3@email.com'),
(4, 'Professor 4', '2025-01-04', 'Efetivo', 'professor4@email.com'),
(5, 'Professor 5', '2025-01-05', 'Efetivo', 'professor5@email.com'),
(6, 'Professor 6', '2025-01-06', 'Efetivo', 'professor6@email.com'),
(7, 'Professor 7', '2025-01-07', 'Efetivo', 'professor7@email.com');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `aluno`
--
ALTER TABLE `aluno`
  ADD PRIMARY KEY (`id_aluno`);

--
-- Índices de tabela `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`codigo`,`id_professor`),
  ADD KEY `fk_materia_professor1_idx` (`id_professor`);

--
-- Índices de tabela `matriculas`
--
ALTER TABLE `matriculas`
  ADD PRIMARY KEY (`id_matricula`),
  ADD KEY `fk_codigo_materia_idx` (`id_matricula`),
  ADD KEY `fk_id_aluno` (`id_aluno`),
  ADD KEY `fk_codigo_materia` (`codigo_materia`);

--
-- Índices de tabela `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`id_professor`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `aluno`
--
ALTER TABLE `aluno`
  MODIFY `id_aluno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `matriculas`
--
ALTER TABLE `matriculas`
  MODIFY `id_matricula` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `professor`
--
ALTER TABLE `professor`
  MODIFY `id_professor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `materia`
--
ALTER TABLE `materia`
  ADD CONSTRAINT `fk_materia_professor` FOREIGN KEY (`id_professor`) REFERENCES `professor` (`id_professor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `matriculas`
--
ALTER TABLE `matriculas`
  ADD CONSTRAINT `fk_codigo_materia` FOREIGN KEY (`codigo_materia`) REFERENCES `materia` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_id_aluno` FOREIGN KEY (`id_aluno`) REFERENCES `aluno` (`id_aluno`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
