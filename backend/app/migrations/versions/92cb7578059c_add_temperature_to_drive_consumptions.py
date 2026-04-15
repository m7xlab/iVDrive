"""add temperature to drive_consumptions

Revision ID: 92cb7578059c
Revises: 30fea49a7f15
Create Date: 2026-04-15 19:15:20.532129
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = '92cb7578059c'
down_revision: Union[str, None] = '30fea49a7f15'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('drive_consumptions', sa.Column('temperature', sa.Float(), nullable=True))


def downgrade() -> None:
    op.drop_column('drive_consumptions', 'temperature')
