import 'package:flutter/material.dart';

class DesenvolvedorItem extends StatelessWidget {
  final String nome;
  final String foto;

  const DesenvolvedorItem({super.key, required this.nome, required this.foto});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: Colors.black26,
                blurRadius: 5,
                offset: Offset(0, 3),
              ),
            ],
          ),
          child: CircleAvatar(backgroundImage: AssetImage(foto), radius: 42),
        ),
        const SizedBox(height: 8),
        Text(
          nome,
          textAlign: TextAlign.center,
          style: theme.textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.w600,
            color: Colors.grey.shade800,
          ),
        ),
      ],
    );
  }
}
