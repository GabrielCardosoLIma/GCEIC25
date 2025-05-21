import 'package:flutter/material.dart';
import '../data/equipe.dart';
import '../widgets/desenvolvedor_item.dart';

class SobreScreen extends StatelessWidget {
  const SobreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(title: const Text('Sobre o App')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 30),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.asset('assets/images/logo.png', height: 100),
            const SizedBox(height: 20),

            Text(
              'Aposentadoria Fácil',
              style: theme.textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: Colors.teal.shade700,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),

            Text(
              'Um aplicativo criado para facilitar o planejamento da sua aposentadoria. Com ele, você calcula com base nas regras atuais, simula diferentes cenários e acompanha seu progresso de forma simples e segura.',
              style: theme.textTheme.bodyLarge?.copyWith(height: 1.5),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 40),

            Text(
              'Equipe de Desenvolvimento',
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
                color: Colors.teal.shade800,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),

            // Lista horizontal de membros da equipe
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children:
                    equipe.map((p) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 12),
                        child: DesenvolvedorItem(
                          nome: p['nome']!,
                          foto: p['foto']!,
                        ),
                      );
                    }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
