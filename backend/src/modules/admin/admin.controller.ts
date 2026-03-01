import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    // Mock companyId injection since auth/JWT is not implemented yet
    private readonly MOCK_COMPANY_ID = 'e2b102b4-3a55-4abc-8e54-526279fcc4b9';

    @Get('stats')
    async getEstatisticas() {
        return this.adminService.obterEstatisticas(this.MOCK_COMPANY_ID);
    }

    @Post('resetar-senhas')
    async resetarSenhas() {
        return this.adminService.resetarSenhas(this.MOCK_COMPANY_ID);
    }

    @Get('departamentos')
    async getDepartamentos() {
        return this.adminService.listarDepartamentos(this.MOCK_COMPANY_ID);
    }

    @Post('departamentos')
    async criarDepartamento(@Body() body: any) {
        return this.adminService.criarDepartamento(this.MOCK_COMPANY_ID, body);
    }

    @Put('departamentos/:id')
    async atualizarDepartamento(@Param('id') id: string, @Body() body: any) {
        return this.adminService.atualizarDepartamento(this.MOCK_COMPANY_ID, id, body);
    }

    @Delete('departamentos/:id')
    async excluirDepartamento(@Param('id') id: string) {
        return this.adminService.excluirDepartamento(this.MOCK_COMPANY_ID, id);
    }

    // --- Serviços ---

    @Get('servicos')
    async getServicos() {
        return this.adminService.listarServicos(this.MOCK_COMPANY_ID);
    }

    @Post('servicos')
    async criarServico(@Body() body: any) {
        return this.adminService.criarServico(this.MOCK_COMPANY_ID, body);
    }

    @Put('servicos/:id')
    async atualizarServico(@Param('id') id: string, @Body() body: any) {
        return this.adminService.atualizarServico(this.MOCK_COMPANY_ID, id, body);
    }

    @Delete('servicos/:id')
    async excluirServico(@Param('id') id: string) {
        return this.adminService.excluirServico(this.MOCK_COMPANY_ID, id);
    }

    // --- Usuários ---

    @Get('usuarios')
    async getUsuarios() {
        return this.adminService.listarUsuarios(this.MOCK_COMPANY_ID);
    }

    @Post('usuarios')
    async criarUsuario(@Body() body: any) {
        return this.adminService.criarUsuario(this.MOCK_COMPANY_ID, body);
    }

    @Put('usuarios/:id')
    async atualizarUsuario(@Param('id') id: string, @Body() body: any) {
        return this.adminService.atualizarUsuario(this.MOCK_COMPANY_ID, id, body);
    }

    @Delete('usuarios/:id')
    async excluirUsuario(@Param('id') id: string) {
        return this.adminService.excluirUsuario(this.MOCK_COMPANY_ID, id);
    }

    // --- Guichês ---

    @Get('guiches')
    async getGuiches() {
        return this.adminService.listarGuiches(this.MOCK_COMPANY_ID);
    }

    @Post('guiches')
    async criarGuiche(@Body() body: any) {
        return this.adminService.criarGuiche(this.MOCK_COMPANY_ID, body);
    }

    @Put('guiches/:id')
    async atualizarGuiche(@Param('id') id: string, @Body() body: any) {
        return this.adminService.atualizarGuiche(this.MOCK_COMPANY_ID, id, body);
    }

    @Delete('guiches/:id')
    async excluirGuiche(@Param('id') id: string) {
        return this.adminService.excluirGuiche(this.MOCK_COMPANY_ID, id);
    }

    @Post('seed')
    async seedDB() {
        return this.adminService.criarDadosDemo(this.MOCK_COMPANY_ID);
    }

    // --- Configurações do Painel Monitor ---

    @Get('painel-config')
    async getPainelConfig() {
        return this.adminService.obterPainelConfig(this.MOCK_COMPANY_ID);
    }

    @Put('painel-config')
    async salvarPainelConfig(@Body() body: any) {
        return this.adminService.salvarPainelConfig(this.MOCK_COMPANY_ID, body);
    }

    // --- Locais (filiais/unidades) ---

    @Get('locais')
    async getLocais() {
        return this.adminService.listarLocais(this.MOCK_COMPANY_ID);
    }

    @Post('locais')
    async criarLocal(@Body() body: any) {
        return this.adminService.criarLocal(this.MOCK_COMPANY_ID, body);
    }

    @Put('locais/:id')
    async atualizarLocal(@Param('id') id: string, @Body() body: any) {
        return this.adminService.atualizarLocal(this.MOCK_COMPANY_ID, id, body);
    }

    @Delete('locais/:id')
    async excluirLocal(@Param('id') id: string) {
        await this.adminService.excluirLocal(this.MOCK_COMPANY_ID, id);
        return { ok: true };
    }
}
