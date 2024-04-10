import { IUsuarios, Usuario } from "../../models/usuario"

export async function addUsuarios(numUsuarios: number): Promise<IUsuarios[]> {
    const usuarios: IUsuarios[] = []

    for (let i = 1; i <= numUsuarios; i++) {
        const usuario: IUsuarios = {
            email: `usuario${i}@email.com`,
            primeiroNome: 'Usuario',
            restoNome: `${i}`,
            dataNascimento: new Date('2000-01-01'),
            genero: i % 2 === 0 ? 'Feminino' : 'Masculino',
            senha: `senha${i}`
        }
        usuario.dataNascimento.setDate(usuario.dataNascimento.getDate() + i)

        usuarios.push(usuario)
    }

    await Usuario.create(usuarios)

    return usuarios
}
