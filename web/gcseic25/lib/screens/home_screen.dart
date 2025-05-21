import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  final List<HomeOption> options = [
    HomeOption(
      title: 'Calcular aposentadoria',
      icon: Icons.calculate,
      color: Colors.teal.shade700,
      route: '/calculo',
    ),
    HomeOption(
      title: 'Simular tempo restante',
      icon: Icons.timeline,
      color: Colors.teal.shade600,
      route: '/simulacao',
    ),
    HomeOption(
      title: 'Ver regras atuais',
      icon: Icons.rule,
      color: Colors.teal.shade500,
      route: '/regras',
    ),
    HomeOption(
      title: 'Quando posso me aposentar?',
      icon: Icons.event_available,
      color: Colors.teal.shade400,
      route: '/quando',
    ),
    HomeOption(
      title: 'Histórico de simulações',
      icon: Icons.history,
      color: Colors.teal.shade300,
      route: '/historico',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final isWide = MediaQuery.of(context).size.width > 700;

    return Scaffold(
      backgroundColor: Color(0xFFF2F4F5),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Topo com logo e ícones
              Row(
                children: [
                  Image.asset('assets/images/logo.png', height: 48),
                  SizedBox(width: 12),
                  Text(
                    'Aposentadoria Fácil',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: Colors.teal.shade800,
                    ),
                  ),
                  Spacer(),
                  IconButton(
                    icon: Icon(Icons.info_outline, color: Colors.teal.shade700),
                    tooltip: 'Sobre',
                    onPressed: () => Navigator.pushNamed(context, '/sobre'),
                  ),
                  IconButton(
                    icon: Icon(Icons.help_outline, color: Colors.teal.shade700),
                    tooltip: 'Ajuda',
                    onPressed: () => Navigator.pushNamed(context, '/ajuda'),
                  ),
                ],
              ),

              SizedBox(height: 24),

              // Mensagem de boas-vindas
              Text(
                'Olá, usuário!',
                style: TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.w700,
                  color: Colors.grey.shade900,
                ),
              ),
              SizedBox(height: 8),
              Text(
                'Seu futuro tranquilo começa aqui.',
                style: TextStyle(fontSize: 18, color: Colors.grey.shade700),
              ),

              SizedBox(height: 28),

              // Grid de opções
              Expanded(
                child: GridView.count(
                  crossAxisCount: isWide ? 3 : 1,
                  crossAxisSpacing: 20,
                  mainAxisSpacing: 20,
                  childAspectRatio: 3.5,
                  children:
                      options.map((option) {
                        return Material(
                          color: Colors.white,
                          elevation: 2,
                          borderRadius: BorderRadius.circular(16),
                          child: InkWell(
                            borderRadius: BorderRadius.circular(16),
                            onTap:
                                () =>
                                    Navigator.pushNamed(context, option.route),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 20,
                              ),
                              child: Row(
                                children: [
                                  Container(
                                    decoration: BoxDecoration(
                                      color: option.color.withOpacity(0.15),
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    padding: EdgeInsets.all(12),
                                    child: Icon(
                                      option.icon,
                                      color: option.color,
                                      size: 28,
                                    ),
                                  ),
                                  SizedBox(width: 20),
                                  Expanded(
                                    child: Text(
                                      option.title,
                                      style: TextStyle(
                                        fontSize: 17,
                                        fontWeight: FontWeight.w600,
                                        color: Colors.grey.shade900,
                                      ),
                                    ),
                                  ),
                                  Icon(
                                    Icons.arrow_forward_ios,
                                    size: 18,
                                    color: Colors.grey.shade400,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class HomeOption {
  final String title;
  final IconData icon;
  final Color color;
  final String route;

  HomeOption({
    required this.title,
    required this.icon,
    required this.color,
    required this.route,
  });
}
